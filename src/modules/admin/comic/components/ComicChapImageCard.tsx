import { Box, Divider, Fade, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { FC, useEffect, useRef, useState } from 'react';
import PublicIcon from '@mui/icons-material/Public';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import FolderIcon from '@mui/icons-material/Folder';
import ImageIcon from '@mui/icons-material/Image';
import { getFolderImageName, getFormatImageName, getShortImageName } from '../../../../utils/generalHelpers';
import { IChapImageInfo } from '../../../../models/chap-image';
import Dialog from '../../../../components/Dialog';

interface Props {
  chapImage: IChapImageInfo;
  handleUploadImage(e: React.ChangeEvent<HTMLInputElement>, isEditImage: boolean, chapImage: IChapImageInfo): void;
  handleDeleteChapImage(deleteChapImageId: string): void;
  index: number;
}

const ComicChapImageCard: FC<Props> = ({ index, chapImage, handleUploadImage, handleDeleteChapImage }) => {
  const classes = useStyles();
  const [isHovered, setIsHovered] = useState(-1);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleCloseDialog = () => {
    setDialogIsOpen(false);
  };
  useEffect(() => {
    if (!dialogIsOpen) {
      setAnchorEl(null);
    }
  }, [dialogIsOpen]);

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        borderRadius: '8px',
        backgroundColor: '#FFF',
        boxShadow: '0 1px 2px rgb(0 0 0 / 20%)',
        '&:hover': {
          boxShadow: '0 4px 5px rgb(0 0 0 / 30%)',
        },
        transition: 'box-shadow 0.15s linear .05s',
        width: '235px',
        height: '225px',
        flexDirection: 'column',
      }}
      onMouseEnter={() => {
        setIsHovered(index);
      }}
      onMouseLeave={() => {
        setIsHovered(-1);
        setAnchorEl(null);
      }}
    >
      {isHovered === index && (
        <>
          <IconButton
            className={classes.actionIconButton}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            keepMounted
            PopoverClasses={{
              paper: classes.menu,
            }}
            open={Boolean(anchorEl)}
            onClose={() => {
              setAnchorEl(null);
            }}
          >
            <MenuItem
              sx={{ padding: '8px' }}
              onClick={() => {
                setAnchorEl(null);
                editInputRef.current?.click();
              }}
            >
              <BuildIcon sx={{ fontSize: '15px' }} />
              <Typography ml={1}>Edit</Typography>
            </MenuItem>
            <Divider />
            <MenuItem
              sx={{ padding: '8px' }}
              onClick={() => {
                setDialogIsOpen(true);
              }}
            >
              <DeleteIcon sx={{ fontSize: '15px' }} />
              <Typography ml={1}>Delete</Typography>
            </MenuItem>
          </Menu>
        </>
      )}

      <img
        src={chapImage.image}
        alt={getShortImageName(chapImage.image)}
        style={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          backgroundColor: '#e3e3e3',
          objectFit: 'contain',
          height: '60%',
        }}
      />
      <Box borderRadius="0px 0px 8px 8px" bgcolor="#fff" p={1}>
        {!(getShortImageName(chapImage.image).length > 34) ? (
          <Typography className={classes.imageName} fontWeight="bold" fontSize="13px">
            {getShortImageName(chapImage.image)}
          </Typography>
        ) : (
          <Tooltip
            classes={{
              tooltip: classes.customTooltip,
            }}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="top"
            title={getShortImageName(chapImage.image)}
          >
            <Typography className={classes.imageName} fontWeight="bold" fontSize="13px">
              {getShortImageName(chapImage.image)}
            </Typography>
          </Tooltip>
        )}
        <Typography display="flex" alignItems="center" fontSize="11px" mb="5px">
          <FolderIcon sx={{ mr: '3px', fontSize: '13px' }} />
          {getFolderImageName(chapImage.image)}
        </Typography>
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography display="flex" alignItems="center" fontSize="11px">
            <ImageIcon sx={{ mr: '3px', fontSize: '13px' }} />
            {getFormatImageName(chapImage.image)}
          </Typography>
          <PublicIcon sx={{ fontSize: '13px' }} />
        </Box>
      </Box>
      <input
        ref={editInputRef}
        type="file"
        hidden
        onChange={(e) => {
          handleUploadImage(e, true, chapImage);
        }}
      />
      <Dialog
        isOpen={dialogIsOpen}
        title="Confirm Delete"
        content="Are you sure you want to delete this chap image ?"
        handleClose={handleCloseDialog}
        handleAccept={() => {
          handleDeleteChapImage(chapImage.id!);
        }}
      />
    </Box>
  );
};

export default ComicChapImageCard;

const useStyles = makeStyles((theme) => ({
  imageName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  customTooltip: {
    backgroundColor: '#687076',
  },
  actionIconButton: {
    position: 'absolute',
    width: '28px',
    height: '28px',
    backgroundColor: '#687076',
    color: '#FFF',
    top: 5,
    right: 5,
    '&:hover': {
      backgroundColor: '#687076',
      color: '#FFF',
    },
  },
  menu: {
    borderRadius: '0px',
  },
}));
