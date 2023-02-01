import * as React from 'react'
import { Paper, Dialog, DialogActions, DialogTitle, DialogContent, Box, Grid, Typography, Fab, Tooltip, Button, IconButton, Stack, TextField, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import EventNoteIcon from '@mui/icons-material/EventNote';

import { useDispatch, useSelector } from 'react-redux'
import { onAddFunc, onDelFunc, onUpdateFunc } from './toDoReducer'

//modal Styles
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function ToDo() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [toDoData, setToDoData] = React.useState({
    title: '',
    description: ''
  })
  const [updateIndex, setUpdateIndex] = React.useState(null)
  const [updateTitle, setUpdateTitle] = React.useState(null)
  const [updateDescription, setUpdateDescription] = React.useState(null)

  let STORE_DATA = useSelector((state) => state.ADD.TO_DO_DATA)
  let dispatch = useDispatch()

  const onAdd = () => {
    //dispatch
    dispatch(onAddFunc(
      {
        title: toDoData.title,
        description: toDoData.description
      }
    ))
    setToDoData({
      title: '',
      description: ''
    })
  }
  const onDel = (index) => {
    //dispatch
    dispatch(onDelFunc(
      {
        index: index
      }
    ))
  }
  const onEdit = (items, index) => {
    handleClickOpen()
    STORE_DATA.map((storeItems, storeIndex) => {
      if (storeIndex === index) {
        setUpdateIndex(index)
        setUpdateTitle(storeItems.title)
        setUpdateDescription(storeItems.description)
      }
    })
  }
  const onUpdate = () => {
    // dispatch
    dispatch(onUpdateFunc(
      {
        index: updateIndex,
        title: updateTitle,
        description: updateDescription
      }
    ))
  }
  const handleClickOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={modalOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography variant='h4' color="secondary.main" sx={{ textAlign: 'center' }}>Edit</Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 2, maxWidth: '100%', display: 'flex', direction: 'column', justifyContent: 'center' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <form>
                <TextField
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  // id="outlined-multiline-flexible"
                  label="Title"
                  multiline
                  maxRows={1}
                  color="secondary"
                  required
                />
                <TextField
                  value={updateDescription}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                  // id="outlined-multiline-flexible"
                  label="Description"
                  multiline
                  maxRows={3}
                  color="secondary"
                  required
                />
              </form>
            </div>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Fab size="small" color="secondary" aria-label="save"
            onClick={(e) => {
              onUpdate(handleClose())
              e.preventDefault()
            }}>
            <Tooltip title="Save" arrow >
              <SaveIcon />
            </Tooltip>
          </Fab>
        </DialogActions>
      </BootstrapDialog>

      <Paper elevation={9} sx={{
        padding: '1rem',
        margin: '2rem auto',
        width:'80%',
        borderRadius: '2rem'
      }} >
        <Typography variant='h3' color="secondary.main" sx={{ textAlign: 'center' }}>Notes</Typography>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 2, maxWidth: '100%', display: 'flex', direction: 'column', justifyContent: 'center' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={toDoData.title}
            onChange={(e) => setToDoData({
              ...toDoData,
              title: e.target.value
            })}
            // id="outlined-multiline-flexible"
            label="Title"
            multiline
            maxRows={1}
            color="secondary"
            required
          />
          <TextField
            value={toDoData.description}
            onChange={(e) => setToDoData({
              ...toDoData,
              description: e.target.value
            })}
            // id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={3}
            color="secondary"
            required
          />
          <Box sx={{ display: 'flex', justifyContent: "center", pb: '1rem' }}>
            <Button
              disabled={toDoData.title === '' || toDoData.description === '' ? true : false}
              size="medium" variant="outlined" color="secondary"
              type="submit"
              onClick={(e) => {
                onAdd()
                e.preventDefault()
              }}>
              Save
            </Button>
          </Box>
        </Box>
      </Paper>

      <Stack sx={{ justifyContent: 'center', pb: 1, mt: 5 }} direction="row" spacing={2}>
        <Fab size="large" color="info">
          <Tooltip title="All Notes" arrow >
            <EventNoteIcon />
          </Tooltip>
        </Fab>
      </Stack>


      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >{STORE_DATA.map((items, index) => {
        return (
          <Paper elevation={3} sx={{
            minWidth: 'fit-content',
            width: '17rem',
            margin: '2rem',
            borderRadius: '1rem'
          }} >
            <Typography variant='h4' color="secondary.main" sx={{ textAlign: 'center' }}>{items.title}</Typography>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 2, maxWidth: '100%', display: 'flex', direction: 'column', justifyContent: 'center' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                value={items.description}
                label="Description"
                multiline
                rows={3}
                color="secondary"
              />
              <Stack sx={{ justifyContent: 'center', pb: 1 }} direction="row" spacing={2}>
                <Fab size="small" color="secondary" aria-label="delete" onClick={() => {
                  onDel(index)
                }}>
                  <Tooltip title="Delete" arrow >
                    <DeleteIcon />
                  </Tooltip>
                </Fab>
                <Fab size="small" color="secondary" aria-label="edit" onClick={() => {
                  onEdit(items, index)
                }}>
                  <Tooltip title="Edit" arrow >
                    <EditIcon />
                  </Tooltip>
                </Fab>
              </Stack>
            </Box>
          </Paper>
        )
      })}
      </Grid>
    </>
  );
}
export default ToDo