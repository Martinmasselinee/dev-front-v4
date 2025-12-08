'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { CloudUpload } from 'lucide-react'
import { COLOR } from '../constants/color'
import { BORDER_RADIUS, BORDER_WIDTH } from '../constants/border'
import { SPACING } from '../constants/spacing'
import { ICON_SIZE } from '../constants/iconSize'
import { TRANSITION } from '../constants/transition'
import { DISPLAY } from '../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT } from '../constants/flex'
import { CURSOR } from '../constants/interaction'
import { TEXT_ALIGN } from '../constants/text'
import { Text } from './Text'

interface FileUploadProps {
  onFileSelect?: (file: File) => void
  acceptedFormats?: string[]
  maxSize?: number // in MB
}

export const FileUpload = ({
  onFileSelect,
  acceptedFormats = ['PDF', 'DOCX', 'PPTX'],
  maxSize = 50,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFile = (file: File) => {
    // Validate file type
    const fileExtension = file.name.split('.').pop()?.toUpperCase()
    if (!fileExtension || !acceptedFormats.includes(fileExtension)) {
      // TODO: Show error message
      return
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSize) {
      // TODO: Show error message
      return
    }

    if (onFileSelect) {
      onFileSelect(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        paddingTop: SPACING.XL,
        paddingLeft: SPACING.XL,
        paddingRight: SPACING.XL,
        paddingBottom: SPACING.XXL,
        backgroundColor: isDragging ? COLOR.GREY.MEDIUM : COLOR.GREY.LIGHT,
        border: `${BORDER_WIDTH.MEDIUM} dashed ${isHovered || isDragging ? COLOR.PURPLE : COLOR.GREY.MEDIUM}`,
        borderRadius: BORDER_RADIUS.L,
        cursor: CURSOR.POINTER,
        transition: `background-color ${TRANSITION.FAST_EASE}, border-color ${TRANSITION.FAST_EASE}`,
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats.map((format) => `.${format.toLowerCase()}`).join(',')}
        onChange={handleFileInput}
        style={{
          display: DISPLAY.NONE,
        }}
      />

      <div
        style={{
          display: DISPLAY.FLEX,
          flexDirection: FLEX_DIRECTION.COLUMN,
          alignItems: ALIGN_ITEMS.CENTER,
          gap: SPACING.M,
        }}
      >
        {/* Icon */}
        <div
          style={{
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            justifyContent: JUSTIFY_CONTENT.CENTER,
          }}
        >
          <CloudUpload
            size={ICON_SIZE.XL * 2}
            style={{
              color: isHovered || isDragging ? COLOR.PURPLE : COLOR.GREY.DARK,
              transition: `color ${TRANSITION.FAST_EASE}`,
            }}
          />
        </div>

        {/* Text content */}
        <div
          style={{
            display: DISPLAY.FLEX,
            flexDirection: FLEX_DIRECTION.COLUMN,
            alignItems: ALIGN_ITEMS.CENTER,
            gap: SPACING.XS,
          }}
        >
          <Text
            size="L"
            weight="XL"
            color="BLACK"
            style={{
              textAlign: TEXT_ALIGN.CENTER,
            }}
          >
            Glissez-déposez votre deck commercial
          </Text>
          <Text
            size="M"
            weight="M"
            color="GREY_DARK"
            style={{
              textAlign: TEXT_ALIGN.CENTER,
            }}
          >
            ou cliquez pour sélectionner un fichier
          </Text>
        </div>
      </div>
    </div>
  )
}

