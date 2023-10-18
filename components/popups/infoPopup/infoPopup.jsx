'use client'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useState } from 'react';
import Image from 'next/image';
import './infoPopup.scss'

const Popup = () => {

    const [open, setOpen] = useState(false);

  return (
    <div>
      <Image src='/assets/infoIcon.png' width={40} height={40} alt='info' onClick={() => setOpen(true)} id='info'/>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        color="neutral"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            SZENT ISTVÁN KIRÁLY ZENEI ALAPITVÁNY
          </Typography>
          <Typography id="modal-desc">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Sheet>
      </Modal>
    </div>
  )
}

export default Popup
