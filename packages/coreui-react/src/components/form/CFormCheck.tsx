import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Colors, Shapes } from '../Types'

import { CFormLabel } from './CFormLabel'

export type ButtonObject = {
  /**
   * Sets the color context of the component to one of CoreUI’s themed colors.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   */
  color?: Colors
  /**
   * Select the shape of the component.
   *
   * @type 'rounded' | 'rounded-top' | 'rounded-end' | 'rounded-bottom' | 'rounded-start' | 'rounded-circle' | 'rounded-pill' | 'rounded-0' | 'rounded-1' | 'rounded-2' | 'rounded-3' | string
   */
  shape?: Shapes
  /**
   * Size the component small or large.
   */
  size?: 'sm' | 'lg'
  /**
   * Set the button variant to an outlined button or a ghost button.
   */
  variant?: 'outline' | 'ghost'
}

export interface CFormCheckProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Create button-like checkboxes and radio buttons.
   */
  button?: ButtonObject
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Sets hit area to the full area of the component.
   */
  hitArea?: 'full'
  /**
   * The id global attribute defines an identifier (ID) that must be unique in the whole document.
   */
  id?: string
  /**
   * Group checkboxes or radios on the same horizontal row by adding.
   */
  inline?: boolean
  /**
   * Set component validation state to invalid.
   */
  invalid?: boolean
  /**
   * The element represents a caption for a component.
   */
  label?: string | ReactNode
  /**
   * Specifies the type of component.
   */
  type?: 'checkbox' | 'radio'
  /**
   * Set component validation state to valid.
   */
  valid?: boolean
}

export const CFormCheck = forwardRef<HTMLInputElement, CFormCheckProps>(
  (
    { className, button, hitArea, id, inline, invalid, label, type = 'checkbox', valid, ...rest },
    ref,
  ) => {
    const _className = classNames(
      'form-check',
      {
        'form-check-inline': inline,
        'is-invalid': invalid,
        'is-valid': valid,
      },
      className,
    )

    const inputClassName = classNames(button ? 'btn-check' : 'form-check-input', {
      'is-invalid': invalid,
      'is-valid': valid,
      'me-2': hitArea,
    })
    const labelClassName = classNames(
      button
        ? classNames(
            'btn',
            button.variant ? `btn-${button.variant}-${button.color}` : `btn-${button.color}`,
            {
              [`btn-${button.size}`]: button.size,
            },
            `${button.shape}`,
          )
        : 'form-check-label',
    )

    const formControl = () => {
      return <input type={type} className={inputClassName} id={id} {...rest} ref={ref} />
    }

    const formLabel = () => {
      return (
        <CFormLabel customClassName={labelClassName} {...(id && { htmlFor: id })}>
          {label}
        </CFormLabel>
      )
    }

    return button ? (
      <>
        {formControl()}
        {label && formLabel()}
      </>
    ) : label ? (
      hitArea ? (
        <CFormLabel customClassName={className} {...(id && { htmlFor: id })}>
          {formControl()}
          {label}
        </CFormLabel>
      ) : (
        <div className={_className}>
          {formControl()}
          {formLabel()}
        </div>
      )
    ) : (
      formControl()
    )
  },
)

CFormCheck.propTypes = {
  button: PropTypes.object,
  className: PropTypes.string,
  hitArea: PropTypes.oneOf(['full']),
  id: PropTypes.string,
  inline: PropTypes.bool,
  invalid: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  type: PropTypes.oneOf(['checkbox', 'radio']),
  valid: PropTypes.bool,
}

CFormCheck.displayName = 'CFormCheck'
