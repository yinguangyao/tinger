import React from 'react';
import classnames from 'classnames'

import style from './index.module.scss'

export default function Index() {
  return (
    <>
      <h1 className={style.title}>sakura</h1>
      <div className={classnames(style.camera, style['-x'])}>
        <div className={classnames(style.camera, style['-y'])}>
          <div className={classnames(style.camera, style['-z'])}>
            {
              [...Array(200)].map((item, i) => {
                return (
                  <div className={style.drop} key={i}>
                    <div className={style.z}>
                      <div className={style.slide}>
                        <div className={style.move}>
                          <div className={style.stagger}>
                            <div className={style.reverse}>
                              <div className={style.rotate}>
                                <div className={style.size}>
                                  <div className={style.sakura}>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}