import React from 'react'
import classnames from 'classnames'
import styles from './styles.module.css'
import { Collapse } from '@theme/Collapse'

import { Opening, Closing } from '@theme/CurlyBraces'

function Header(row, anchorRoot) {
  return (
    <span
      className={styles.property}
      dangerouslySetInnerHTML={{
        __html: `<code><strong>${row.property}</strong><span>${
          row.optional ? '?' : ''
        }: ${row.type}</span></code><a
        aria-hidden="true"
        tabindex="-1"
        class="hash-link"
        href="#${(anchorRoot ? anchorRoot + '.' : '') + row.property}"
        title="Direct link to heading"
      >
        #
      </a>`,
      }}
    ></span>
  )
}

function Content(row, anchorRoot) {
  return (
    <div>
      {!row.child && Header(row, anchorRoot)}
      {!row.child && (
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: row.description }}
        ></div>
      )}

      {row.child}
    </div>
  )
}

export default ({ rows, anchorRoot = '' }) => {
  const hash = typeof location !== 'undefined' ? location.hash.replace('#', '') : ''

  return (
    <div className={styles.row}>
      <Opening />

      <div className={classnames(styles.content)}>
        {rows.map((row) => {
          const target = (anchorRoot ? anchorRoot + '.' : '') + row.property
          
          return (
            <div
              id={target}
              className={classnames('anchorify')}
            >
              {row.child ? (
                <Collapse header={Header(row, anchorRoot)} isOpened={hash.startsWith(target)}>
                  {Content(row)}
                </Collapse>
              ) : (
                Content(row, anchorRoot)
              )}
            </div>
          )
        })}
      </div>
      <Closing />
    </div>
  )
}
