export type TStageStatus = 'current' | 'done' | 'next' 

export type TStage = {
  status: TStageStatus
  title: string
  icon: React.ReactNode | string
}