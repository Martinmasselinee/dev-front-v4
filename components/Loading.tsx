import { SPACING } from '../constants/spacing'
import { COLOR } from '../constants/color'
import { Z_INDEX } from '../constants/zIndex'
import { OPACITY } from '../constants/opacity'
import { TEXT_ALIGN } from '../constants/textAlign'
import { Text } from './Text'
import { hexToRgba } from '../lib/colorUtils'

interface LoadingProps {
  message?: string
  isVisible?: boolean
}

export const Loading = ({ message = 'Chargement de vos workspaces...', isVisible = true }: LoadingProps) => {
  if (!isVisible) return null

  const whiteOverlay = hexToRgba(COLOR.WHITE, OPACITY.LOADING_OVERLAY)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: whiteOverlay,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: Z_INDEX.POPUP,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: SPACING.L,
      }}
    >
      {/* Spinner */}
      <div
        className="loading-spinner"
        style={{
          width: SPACING.XXXL,
          height: SPACING.XXXL,
          border: `4px solid ${COLOR.GREY.LIGHT}`,
          borderTop: `4px solid ${COLOR.PURPLE}`,
          borderRadius: '50%',
        }}
      />
      
      {/* Message */}
      {message && (
        <Text
          size="M"
          weight="M"
          color="GREY_DARK"
          style={{
            textAlign: TEXT_ALIGN.CENTER,
          }}
        >
          {message}
        </Text>
      )}
    </div>
  )
}

