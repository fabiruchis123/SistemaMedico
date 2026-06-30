// src/screens/medico/styles/medicoStyles.js

export const medicoStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    padding: '12px 16px',
    border: '1px solid #E8E8E8',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '16px',
  },
}
