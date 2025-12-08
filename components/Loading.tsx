import { SPACING } from '../constants/spacing'
import { COLOR } from '../constants/color'
import { Z_INDEX } from '../constants/zIndex'
import { OPACITY } from '../constants/opacity'
import { TEXT_ALIGN } from '../constants/textAlign'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS } from '../constants/alignItems'
import { JUSTIFY_CONTENT } from '../constants/justifyContent'
import { FLEX_DIRECTION } from '../constants/flexDirection'
import { POSITION } from '../constants/position'
import { POSITION_TYPE } from '../constants/positionType'
import { BORDER_RADIUS } from '../constants/borderRadius'
import { BORDER_WIDTH } from '../constants/borderWidth'
import { BACKDROP_FILTER } from '../constants/backdropFilter'
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
        position: POSITION_TYPE.FIXED,
        top: POSITION.ZERO,
        left: POSITION.ZERO,
        right: POSITION.ZERO,
        bottom: POSITION.ZERO,
        backgroundColor: whiteOverlay,
        backdropFilter: BACKDROP_FILTER.BLUR_20,
        WebkitBackdropFilter: BACKDROP_FILTER.BLUR_20,
        zIndex: Z_INDEX.POPUP,
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        justifyContent: JUSTIFY_CONTENT.CENTER,
        flexDirection: FLEX_DIRECTION.COLUMN,
        gap: SPACING.L,
      }}
    >
      {/* Spinner */}
      <div
        className="loading-spinner"
        style={{
          width: SPACING.XXXL,
          height: SPACING.XXXL,
          border: `${BORDER_WIDTH.THICK} solid ${COLOR.GREY.LIGHT}`,
          borderTop: `${BORDER_WIDTH.THICK} solid ${COLOR.PURPLE}`,
          borderRadius: BORDER_RADIUS.CIRCLE,
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

