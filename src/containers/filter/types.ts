import { TransferType } from "store/types";

export type FilterPropsType = {
  transfer:Array<TransferType>
  handler:( event:React.ChangeEvent<HTMLElement> )=>void
}