if (avatar) {
    return(
        <div className='photoProfile'>
            <Avatar
                alt="Remy Sharp"
                src={imageList}
                sx={{ width: 200, height: 200 }}
            />
            <input type="file" 
                onChange={(e) => {
                  setImageUpLoad(e.target.files)
                }}/>
            <button onClick={prePreview}>Preview photo</button>
        </div>
    )
  } else {
    return (
      <div className='second_Prof_Photo'>
        <Modal
          open={avatar}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Avatar
              alt="Remy Sharp"
              src={imageList}
              sx={{ width: 200, height: 200 }}
            />
            <button onClick={goNext}>Add img</button>
            <br />
            <button onClick={() => setAvatar(true)}>go back</button>
          </Box>
      </Modal>
    </div>

    )
    }