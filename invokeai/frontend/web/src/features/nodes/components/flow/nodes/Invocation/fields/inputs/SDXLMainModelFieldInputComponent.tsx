import { Flex } from '@chakra-ui/react';
import { SelectItem } from '@mantine/core';
import { useAppDispatch } from 'app/store/storeHooks';
import IAIMantineSearchableSelect from 'common/components/IAIMantineSearchableSelect';
import { fieldMainModelValueChanged } from 'features/nodes/store/nodesSlice';
import {
  SDXLMainModelFieldInputTemplate,
  SDXLMainModelFieldInputInstance,
} from 'features/nodes/types/field';
import { FieldComponentProps } from './types';
import { MODEL_TYPE_MAP } from 'features/parameters/types/constants';
import { modelIdToMainModelParam } from 'features/parameters/util/modelIdToMainModelParam';
import { useFeatureStatus } from 'features/system/hooks/useFeatureStatus';
import SyncModelsButton from 'features/modelManager/subpanels/ModelManagerSettingsPanel/SyncModelsButton';
import { forEach } from 'lodash-es';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SDXL_MAIN_MODELS } from 'services/api/constants';
import {
  useGetMainModelsQuery,
  useGetOnnxModelsQuery,
} from 'services/api/endpoints/models';

const SDXLMainModelFieldInputComponent = (
  props: FieldComponentProps<
    SDXLMainModelFieldInputInstance,
    SDXLMainModelFieldInputTemplate
  >
) => {
  const { nodeId, field } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isSyncModelEnabled = useFeatureStatus('syncModels').isFeatureEnabled;

  const { data: onnxModels } = useGetOnnxModelsQuery(SDXL_MAIN_MODELS);
  const { data: mainModels, isLoading } =
    useGetMainModelsQuery(SDXL_MAIN_MODELS);

  const data = useMemo(() => {
    if (!mainModels) {
      return [];
    }

    const data: SelectItem[] = [];

    forEach(mainModels.entities, (model, id) => {
      if (!model || model.base_model !== 'sdxl') {
        return;
      }

      data.push({
        value: id,
        label: model.model_name,
        group: MODEL_TYPE_MAP[model.base_model],
      });
    });

    if (onnxModels) {
      forEach(onnxModels.entities, (model, id) => {
        if (!model || model.base_model !== 'sdxl') {
          return;
        }

        data.push({
          value: id,
          label: model.model_name,
          group: MODEL_TYPE_MAP[model.base_model],
        });
      });
    }
    return data;
  }, [mainModels, onnxModels]);

  // grab the full model entity from the RTK Query cache
  // TODO: maybe we should just store the full model entity in state?
  const selectedModel = useMemo(
    () =>
      (mainModels?.entities[
        `${field.value?.base_model}/main/${field.value?.model_name}`
      ] ||
        onnxModels?.entities[
          `${field.value?.base_model}/onnx/${field.value?.model_name}`
        ]) ??
      null,
    [
      field.value?.base_model,
      field.value?.model_name,
      mainModels?.entities,
      onnxModels?.entities,
    ]
  );

  const handleChangeModel = useCallback(
    (v: string | null) => {
      if (!v) {
        return;
      }

      const newModel = modelIdToMainModelParam(v);

      if (!newModel) {
        return;
      }

      dispatch(
        fieldMainModelValueChanged({
          nodeId,
          fieldName: field.name,
          value: newModel,
        })
      );
    },
    [dispatch, field.name, nodeId]
  );

  return isLoading ? (
    <IAIMantineSearchableSelect
      label={t('modelManager.model')}
      placeholder={t('models.loading')}
      disabled={true}
      data={[]}
    />
  ) : (
    <Flex w="100%" alignItems="center" gap={2}>
      <IAIMantineSearchableSelect
        className="nowheel nodrag"
        tooltip={selectedModel?.description}
        value={selectedModel?.id}
        placeholder={
          data.length > 0
            ? t('models.selectModel')
            : t('models.noModelsAvailable')
        }
        data={data}
        error={!selectedModel}
        disabled={data.length === 0}
        onChange={handleChangeModel}
        sx={{
          width: '100%',
          '.mantine-Select-dropdown': {
            width: '16rem !important',
          },
        }}
      />
      {isSyncModelEnabled && <SyncModelsButton className="nodrag" iconMode />}
    </Flex>
  );
};

export default memo(SDXLMainModelFieldInputComponent);
