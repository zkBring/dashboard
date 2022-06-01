export type TQRStatus = 
  'sent_to_printer' | 'way_to_warehouse' | 'inserted_to_boxes' | 'ready_to_ship'

export type TQR = {
  title: string,
  quantity: number,
  status: TQRStatus,
  id: number | string
}
