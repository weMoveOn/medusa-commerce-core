import React from "react"
import Modal from "../../../../../components/molecules/modal"
interface IProps {
  openSiteEditModal: boolean
  setOpenSiteEditModal: React.Dispatch<React.SetStateAction<boolean>>
}
const SiteEditModal = ({ openSiteEditModal, setOpenSiteEditModal }: IProps) => {
  return (
    <Modal
      open={openSiteEditModal}
      handleClose={() => setOpenSiteEditModal(false)}
      //   handleClose={() => setOpenAddCustomProductModal(false)}
    >
      <Modal.Header
        className="h-[56px]"
        iconClass="self-center"
        // handleClose={() => setOpenAddCustomProductModal(false)}
        handleClose={() => setOpenSiteEditModal(false)}
      >
        <p className="font-bold">Site Edit</p>
      </Modal.Header>
      <Modal.Body className="max-w-full p-6">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id nam optio
        ducimus debitis harum obcaecati voluptas ab nemo accusamus cupiditate
        consequuntur dignissimos saepe quod, nesciunt, animi porro? Quibusdam,
        necessitatibus harum. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Id nam optio ducimus debitis harum obcaecati voluptas
        ab nemo accusamus cupiditate consequuntur dignissimos saepe quod,
        nesciunt, animi porro? Quibusdam, necessitatibus harum. Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Id nam optio ducimus
        debitis harum obcaecati voluptas ab nemo accusamus cupiditate
        consequuntur dignissimos saepe quod, nesciunt, animi porro? Quibusdam,
        necessitatibus harum. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Id nam optio ducimus debitis harum obcaecati voluptas
        ab nemo accusamus cupiditate consequuntur dignissimos saepe quod,
        nesciunt, animi porro? Quibusdam, necessitatibus harum. Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Id nam optio ducimus
        debitis harum obcaecati voluptas ab nemo accusamus cupiditate
        consequuntur dignissimos saepe quod, nesciunt, animi porro? Quibusdam,
        necessitatibus harum. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Id nam optio ducimus debitis harum obcaecati voluptas
        ab nemo accusamus cupiditate consequuntur dignissimos saepe quod,
        nesciunt, animi porro? Quibusdam, necessitatibus harum. Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Id nam optio ducimus
        debitis harum obcaecati voluptas ab nemo accusamus cupiditate
        consequuntur dignissimos saepe quod, nesciunt, animi porro? Quibusdam,
        necessitatibus harum. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Id nam optio ducimus debitis harum obcaecati voluptas
        ab nemo accusamus cupiditate consequuntur dignissimos saepe quod,
        nesciunt, animi porro? Quibusdam, necessitatibus harum. Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Id nam optio ducimus
        debitis harum obcaecati voluptas ab nemo accusamus cupiditate
        consequuntur dignissimos saepe quod, nesciunt, animi porro? Quibusdam,
        necessitatibus harum. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Id nam optio ducimus debitis harum obcaecati voluptas
        ab nemo accusamus cupiditate consequuntur dignissimos saepe quod,
        nesciunt, animi porro? Quibusdam, necessitatibus harum. Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Id nam optio ducimus
        debitis harum obcaecati voluptas ab nemo accusamus cupiditate
        consequuntur dignissimos saepe quod, nesciunt, animi porro? Quibusdam,
        necessitatibus harum. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Id nam optio ducimus debitis harum obcaecati voluptas
        ab nemo accusamus cupiditate consequuntur dignissimos saepe quod,
        nesciunt, animi porro? Quibusdam, necessitatibus harum. Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Id nam optio ducimus
        debitis harum obcaecati voluptas ab nemo accusamus cupiditate
        consequuntur dignissimos saepe quod, nesciunt, animi porro? Quibusdam,
        necessitatibus harum. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Id nam optio ducimus debitis harum obcaecati voluptas
        ab nemo accusamus cupiditate consequuntur dignissimos saepe quod,
        nesciunt, animi porro? Quibusdam, necessitatibus harum. Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Id nam optio ducimus
        debitis harum obcaecati voluptas ab nemo accusamus cupiditate
        consequuntur dignissimos saepe quod, nesciunt, animi porro? Quibusdam,
        necessitatibus harum. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Id nam optio ducimus debitis harum obcaecati voluptas
        ab nemo accusamus cupiditate consequuntur dignissimos saepe quod,
        nesciunt, animi porro? Quibusdam, necessitatibus harum. Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Id nam optio ducimus
        debitis harum obcaecati voluptas ab nemo accusamus cupiditate
        consequuntur dignissimos saepe quod, nesciunt, animi porro? Quibusdam,
        necessitatibus harum. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Id nam optio ducimus debitis harum obcaecati voluptas
        ab nemo accusamus cupiditate consequuntur dignissimos saepe quod,
        nesciunt, animi porro? Quibusdam, necessitatibus harum. Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Id nam optio ducimus
        debitis harum obcaecati voluptas ab nemo accusamus cupiditate
        consequuntur dignissimos saepe quod, nesciunt, animi porro? Quibusdam,
        necessitatibus harum. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Id nam optio ducimus debitis harum obcaecati voluptas
        ab nemo accusamus cupiditate consequuntur dignissimos saepe quod,
        nesciunt, animi porro? Quibusdam, necessitatibus harum. Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Id nam optio ducimus
        debitis harum obcaecati voluptas ab nemo accusamus cupiditate
        consequuntur dignissimos saepe quod, nesciunt, animi porro? Quibusdam,
        necessitatibus harum.
      </Modal.Body>
      <Modal.Footer className="justify-end !px-4">footer</Modal.Footer>
    </Modal>
  )
}

export default SiteEditModal
