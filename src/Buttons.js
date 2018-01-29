import React from 'react';

class Buttons extends React.Component {
  render() {
    const { buttonArr, handleInfo, handleNextPrev } = this.props;
    return (
      <div className="infoContain">
        <div className="buttons" >
          {buttonArr.map(button => {
            return (
              <button
                className="btns"
                name={button}
                id={button}
                onClick={handleInfo}
              >
                {button.toUpperCase()}
              </button>
            );
          })}
        </div>
        <div id="Next_Prev">
          <button
            className="Next_Prev"
            name="Previous"
            onClick={handleNextPrev}
          >Previous
          </button>

          <button
            className="Next_Prev"
            name="Next"
            onClick={handleNextPrev}
          >Next
          </button>
        </div>
      </div>
    );
  }
}




export default Buttons;





/*
class Buttons extends React.Component {
  render() {
    const { buttonArr, handleInfo, handleNextPrev } = this.props;
    return (
      <div className="infoContain">
        <div className="buttons" >
          {buttonArr.map(ele => {
            return (
              <button
                className="btns"
                name={ele}
                id={ele}
                onClick={handleInfo}
              >
                {ele.toUpperCase()}
              </button>
            );
          })}
        </div>
        <div id="Next_Prev">
          <button
            className="Next_Prev"
            name="Previous"
            onClick={handleNextPrev}
          >Previous
          </button>

          <button
            className="Next_Prev"
            name="Next"
            onClick={handleNextPrev}
          >Next
          </button>
        </div>
      </div>
    );
  }
}

*/