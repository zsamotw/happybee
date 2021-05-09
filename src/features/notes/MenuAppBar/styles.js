const iconLinkStyles = theme => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textDecoration: 'none',
  color: '#fff',
  fontSize: '20px',
  cursor: 'pointer',
  marginRight: '2rem',
  '&:hover': {
    color: `${theme.palette.grey[200]}`
  },
  '& div': {
    fontSize: '11px'
  }
})

export default iconLinkStyles
