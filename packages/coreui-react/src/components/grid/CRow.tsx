import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export type BPObject = {
  cols?: 'auto' | number | string | null
  gutter?: number | string | null
  gutterX?: number | string | null
  gutterY?: number | string | null
}

export interface CRowProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * The number of columns/offset/order on extra small devices (<576px).
   *
   * @type {{ cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }}
   */
  xs?: BPObject
  /**
   * The number of columns/offset/order on small devices (<768px).
   *
   * @type {{ cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }}
   */
  sm?: BPObject
  /**
   * The number of columns/offset/order on medium devices (<992px).
   *
   * @type {{ cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }}
   */
  md?: BPObject
  /**
   * The number of columns/offset/order on large devices (<1200px).
   *
   * @type {{ cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }}
   */
  lg?: BPObject
  /**
   * The number of columns/offset/order on X-Large devices (<1400px).
   *
   * @type {{ cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }}
   */
  xl?: BPObject
  /**
   * The number of columns/offset/order on XX-Large devices (≥1400px).
   *
   * @type {{ cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }}
   */
  xxl?: BPObject
}

const BREAKPOINTS = [
  'xxl' as const,
  'xl' as const,
  'lg' as const,
  'md' as const,
  'sm' as const,
  'xs' as const,
]

export const CRow = forwardRef<HTMLDivElement, CRowProps>(
  ({ children, className, ...rest }, ref) => {
    const repsonsiveCLassNames: string[] = []

    BREAKPOINTS.forEach((bp) => {
      const breakpoint = rest[bp]
      delete rest[bp]

      const infix = bp === 'xs' ? '' : `-${bp}`

      if (typeof breakpoint === 'object') {
        if (breakpoint.cols) {
          repsonsiveCLassNames.push(`row-cols${infix}-${breakpoint.cols}`)
        }
        if (typeof breakpoint.gutter === 'number') {
          repsonsiveCLassNames.push(`g${infix}-${breakpoint.gutter}`)
        }
        if (typeof breakpoint.gutterX === 'number') {
          repsonsiveCLassNames.push(`gx${infix}-${breakpoint.gutterX}`)
        }
        if (typeof breakpoint.gutterY === 'number') {
          repsonsiveCLassNames.push(`gy${infix}-${breakpoint.gutterY}`)
        }
      }
    })

    const _className = classNames('row', repsonsiveCLassNames, className)

    return (
      <div className={_className} ref={ref}>
        {children}
      </div>
    )
  },
)

const bp = PropTypes.shape({
  cols: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.string]),
  gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gutterX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gutterY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
})

CRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  xs: bp,
  sm: bp,
  md: bp,
  lg: bp,
  xl: bp,
  xxl: bp,
}

CRow.displayName = 'CRow'
