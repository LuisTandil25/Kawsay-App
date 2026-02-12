
import { GrowthStage } from './types';

export const KAWSAY_COCO_CHART = {
  [GrowthStage.GERMINATION]: {
    ec: 0.4,
    ph: 5.8,
    tasks: ['Mantener humedad 80%+', 'Luz suave']
  },
  [GrowthStage.SEEDLING]: {
    ec: 0.8,
    ph: 5.9,
    tasks: ['Primer riego con nutrientes base', 'Mantener 24°C']
  },
  [GrowthStage.VEGETATIVE]: {
    ec: 1.2,
    ph: 6.0,
    tasks: ['Poda apical (opcional)', 'LST para mayor cobertura', 'Nutrientes ricos en Nitrógeno']
  },
  [GrowthStage.FLOWERING]: {
    ec: 1.8,
    ph: 6.2,
    tasks: ['Defoliación semana 3', 'Añadir PK booster', 'Controlar humedad < 50%']
  },
  [GrowthStage.FLUSH]: {
    ec: 0.2,
    ph: 6.5,
    tasks: ['Agua pura o con limpiador', 'Observar tricomas']
  }
};

export const INITIAL_PLANTS = [
  {
    id: '1',
    name: 'Gorilla Glue #4',
    strain: 'Híbrida',
    startDate: new Date().toISOString(),
    stage: GrowthStage.VEGETATIVE,
    isAuto: false,
    imageUrl: 'https://picsum.photos/seed/cannabis1/400/400'
  }
];
