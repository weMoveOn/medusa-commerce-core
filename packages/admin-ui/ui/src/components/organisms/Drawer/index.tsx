// import { Drawer } from "vaul"
// import Button from "../../fundamentals/button"
// import CrossIcon from "../../fundamentals/icons/cross-icon"
// import AddCustomerFormMobile from "../../../domain/orders/new/components/add-customer-mobile"


// const BottomModal = ({ open, onClose, children }) => {
//   return (
//     <Drawer.Root dismissible={false} open={openCreateCustomerModal}>
//       <Drawer.Portal>
//         <Drawer.Overlay className="fixed inset-0 bg-black/40" />
//         <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-[10px] bg-zinc-100">
//           <div className="mt-2 flex items-center justify-between px-4">
//             <h2 className="text-sm font-bold">Create New Customer</h2>
//             <Button
//               className=""
//               variant="ghost"
//               onClick={() => setOpenCreateCustomerModal(false)}
//             >
//               <CrossIcon size={20} />
//             </Button>
//           </div>
//           <div className="h-[90vh] overflow-y-auto">
//             <AddCustomerFormMobile
//               setOpenCreateCustomerModal={setOpenCreateCustomerModal}
//             />
//           </div>
//         </Drawer.Content>
//       </Drawer.Portal>
//     </Drawer.Root>
//   )
// }
