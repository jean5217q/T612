import React, { Component } from 'react';

class Budget_Add_Form extends Component {
  render() {
    const {
      value,
      title,
      select_type,
      openAddFrame,
      closeAddItem,
      setTitle,
      setValue,
      setType,
      type,
      addBudgetToDb,
      selectBar,
      currencyBar,
      openSelect,
      openCurrency,
      lang,
      txt,
      currency_arr,
      select_currency,
      setCurrency,
      closeDrop,
      typeDropStyle,
      currencyDropStyle
    } = this.props
    return (
      <form
        onSubmit={addBudgetToDb}
        style={openAddFrame ? { display: 'block' } : { display: 'none' }}
        className='add-budget-form'>
        <div
          className='add-budget-form-inner'
          onClick={closeDrop}>
          {/* 選單類型 */}
          <div className={`budget-input type ${typeDropStyle && 'style'}`}>
            {/* 選單顯示字區域 */}
            <div
              className='budget-drop-title-wrap'
              onClick={openSelect}>
              <div className={`budget-type-icon ${select_type}`}></div>
              <div
                className='budget-drop-title'>
                {txt['type'][select_type][lang]}
              </div>
              <i className="fas fa-caret-down budget-drop-icon"></i>
            </div>
            {/* 真正選單區域 */}
            <ul
              style={selectBar ? { display: 'block' } : { display: 'none' }}
              className={`budget-drop-ul type ${typeDropStyle && 'style'}`}>
              {
                type.map((el, index) =>
                  <li
                    className={`budget-type-item ${typeDropStyle && 'style'}`}
                    key={index}
                    onClick={() => setType(el)}>
                    <div className={`budget-type-icon ${el}`}></div>
                    <div className='budget-type-text'>
                      {txt['type'][el][lang]}
                    </div>
                  </li>
                )
              }
            </ul>
          </div>
          <input
            className='item budget-input'
            type='text'
            placeholder={txt['item'][lang]}
            value={title}
            onChange={setTitle} />
          <input
            className='cost budget-input'
            type='number'
            placeholder={txt['spend'][lang]}
            value={value}
            onChange={setValue} />
          {/* 選取貨幣 */}
          <div
            className={`budget-input currency ${currencyDropStyle && 'style'}`}
            onClick={openCurrency}>
            {/* 選單顯示字區域 */}
            <div className='budget-drop-title-wrap'>
              <div
                className='budget-drop-title'
              >{select_currency}
              </div>
              <i className="fas fa-caret-down budget-drop-icon"></i>
            </div>
            {/* 真正選單區域 */}
            <ul
              style={currencyBar ? { display: 'block' } : { display: 'none' }}
              className={`budget-drop-ul currency ${currencyDropStyle && 'style'}`}>
              {
                currency_arr.map((el, index) =>
                  <li
                    className={`budget-type-item ${currencyDropStyle && 'style'}`}
                    key={index}
                    onClick={() => setCurrency(el)}>
                    <div className='budget-type-text'>
                      {el}
                    </div>
                  </li>
                )
              }
            </ul>
          </div>



          {/* 






          <div className='budget-select-currency'>
            <div
              className='budget-select-title budget-input'
              onClick={openCurrency}>{select_currency}</div>
            <ul
              style={currencyBar ? { display: 'flex' } : { display: 'none' }}
              className='drop currency'>
              {
                currency_arr.map((el, index) =>
                  <li
                    className='budget-select-item'
                    key={index}
                    onClick={() => setCurrency(el['currency'])}
                  >{el['currency']}
                  </li>
                )
              }
            </ul>
          </div> */}


          <button className='add-budget-button' type='submit'>{txt['submit'][lang]}</button>
        </div>
        {/* 取消 */}
        <div
          className="add-budget-cancel-btn"
          onClick={closeAddItem}>
        </div>
      </form>
    )
  }
}
export default Budget_Add_Form