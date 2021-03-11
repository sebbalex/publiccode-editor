import React, { Component } from "react";
import available_languages from "../contents/langs";
//const available_languages = ["ita", "eng", "fra", "zho"];
import CloseButton from "./CloseButton";

export default class languageSwitcher extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { languages, currentLanguage, search } = this.props;
    //console.log(error);
    let results = available_languages;
    if (search)
      results = available_languages.filter(name => name.indexOf(search) > -1);

    return (
      <div className="language-switcher">
        {languages.map(lng => {
          let cn = "language-switcher__item";
          if (lng == currentLanguage) {
            cn += " language-switcher__item--selected";
          }
          return (
            <div
              key={lng}
              className={cn}
            >
              <div
                className="language-switcher__item-label"
                onClick={() => this.props.switchLang(lng)}
              >
                {lng}
              </div>
              <CloseButton onClick={() => this.props.removeLang(lng)} />
            </div>
          );
        })}
        <div className="dropdown language-filter__dropdown">
          <div
            className="language-switcher__item"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <a> + Add Language </a>
          </div>
          <div
            className="dropdown-menu language-filter"
            aria-labelledby="dropdownMenuButton"
          >
            <div className="form-group">
              <input
                type="text"
                name="search"
                className="form-control language-filter__input"
                placeholder="Search"
                onChange={e => this.props.onSearch(e.target.value)}
              />
            </div>

            <div className="language-filter__content">
              {results.map(lng => (
                <a
                  key={lng}
                  className="dropdown-item language-filter__content__item"
                  onClick={() => this.props.switchLang(lng)}
                >
                  {lng}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
