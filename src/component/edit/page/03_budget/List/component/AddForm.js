import React, { Component } from 'react';

class AddForm extends Component {
  render() {
    const {
      lang,
      text,
      currencyList,
      currencyDropShowing,
      select_currency,
      value,
      title,
      select_type,
      typeDropShowing,
      AddBoardShowing,
      type,
      typeDropStyling,
      currencyDropStyling,
      hideAddBoard,
      setCostTitle,
      setCostValue,
      setCostType,
      addItemToDb,
      showTypeDrop,
      showCurrencyDrop,
      setCostCurrency,
      closeAllDrop
    } = this.props
    return (
      <form
        onSubmit={addItemToDb}
        style={AddBoardShowing ? { display: 'block' } : { display: 'none' }}
        className='add-budget-form'>
        <div
          className='add-budget-form-inner'
          onClick={closeAllDrop}>
          {/* 選單類型 */}
          <div className={`budget-input type ${typeDropStyling && 'style'}`}>
            {/* 選單顯示字區域 */}
            <div
              className='budget-drop-title-wrap'
              onClick={showTypeDrop}>
              <div className={`budget-type-icon ${select_type}`}></div>
              <div
                className='budget-drop-title'>
                {text['type'][select_type][lang]}
              </div>
              <i className="fas fa-caret-down budget-drop-icon"></i>
            </div>
            {/* 真正選單區域 */}
            <ul
              style={typeDropShowing ? { display: 'block' } : { display: 'none' }}
              className={`budget-drop-ul type ${typeDropStyling && 'style'}`}>
              {
                type.map((el, index) =>
                  <li
                    className={`budget-type-item ${typeDropStyling && 'style'}`}
                    key={index}
                    onClick={() => setCostType(el)}>
                    <div className={`budget-type-icon ${el}`}></div>
                    <div className='budget-type-text'>
                      {text['type'][el][lang]}
                    </div>
                  </li>
                )
              }
            </ul>
          </div>
          <input
            className='item budget-input'
            type='text'
            placeholder={text['item'][lang]}
            value={title}
            onChange={setCostTitle} />
          <input
            className='cost budget-input'
            type='number'
            placeholder={text['spend'][lang]}
            value={value}
            onChange={setCostValue} />
          {/* 選取貨幣 */}
          <div
            className={`budget-input currency ${currencyDropStyling && 'style'}`}
            onClick={showCurrencyDrop}>
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
              style={currencyDropShowing ? { display: 'block' } : { display: 'none' }}
              className={`budget-drop-ul currency ${currencyDropStyling && 'style'}`}>
              {
                currencyList.map((el, index) =>
                  <li
                    className={`budget-type-item ${currencyDropStyling && 'style'}`}
                    key={index}
                    onClick={() => setCostCurrency(el)}>
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


          <button className='add-budget-button' type='submit'>{text['submit'][lang]}</button>
        </div>
        {/* 取消 */}
        <div
          className="add-budget-cancel-btn"
          onClick={hideAddBoard}>
        </div>
      </form>
    )
  }
}
export default AddForm