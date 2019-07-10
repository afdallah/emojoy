import React from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";
import EmojiBox from "./EmojiBox";

import Wrapper from './Wrapper';
import Accordion from './Accordion';
import emojiList from "./emojiList.json";
import SearchField from "./SearchField";
import Panel from "./Panel";
import Emoji from "./Emoji";
import "./style.css";
import { relative } from "upath";

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  * {
    box-sizing: border-box
  }

  body {
    font-family: 'Sf Pro Display', Helvetica, sans-serif;
    background: #5c6ac4;
  }
`;

const Icon = styled.span`
  color: #fff;
  position: absolute;
  right: 0;
  margin-right: 12px;
  transform: ${props => props.open ? 'rotate(180deg)' : 'initial'}
`;

const Tooltip = styled.span`
  position: absolute;
  top: -120%;
  left: -40px;
  background: #333;
  color: #fff;
  padding: 5px 12px;
  border-radius: 5px;
  display: ${props => props.active ? 'block' : 'none'};
  min-width: 120px;
  z-index: 9;
  transform: scale(1);
`;


const AccordionTitle = styled.h3`
  position: relative;
  margin: 0;
  background: rgb(21, 28, 34);
  color: #fff;
  height: 42px;
  line-height: 42px;
  padding: 0 12px;
`;

class App extends React.Component {
  state = {
    isOpen: 0,
    isHover: null,
    emojis: [],
    cats: [],
    limit: 20
  };

  componentDidMount = () => {
    const emojis = emojiList;
    this.setState({
      emojis
    })
  }

  toggleAccordion = (event, index) => {
    this.setState({ isOpen: index });
  };

  renderEmoji = (filtered, length = emojiList.length) => {
    let cats = [];
    return filtered.map((o, i) => {

      if (cats.includes(o.category)) return false;
      if (i >= length) return false;

      cats.push(o.category);

      return (
        <Accordion key={i} onClick={e => this.toggleAccordion(e, i)}>
          <AccordionTitle>{o.category} <Icon open={this.state.isOpen === i}>👇</Icon></AccordionTitle>
          <Panel open={(this.state.isOpen === i)}>
            {
              filtered
              .filter(e => e.category === o.category)
              .map((m, i) => {
                // Todo: Buat opsi untuk menampilkan limit per category
                // Semakin sedikit, semakin bagus untuk rendering.
                // N.B : meskipun limit diset angka kecil.
                // Searchbox akan tetap menampilkan hasil sesuai keyword
                const limit = this.state.limit // Specify limit per category to show
                if (i <= limit) {
                   return (
                      <Emoji
                        key={m.emoji}
                        onClick={(e) => this.copyMode(e, m.emoji, i)}
                      >
                        {m.emoji}
                        <Tooltip className="tooltip" active={this.state.isHover === i}>Emoji copied!</Tooltip>
                      </Emoji>
                   )
                }
              })
            }
          </Panel>
        </Accordion>
      );
    });
  };

  handleChange = event => {
    const value = event.target.value;
    let filtered = emojiList

    const filter = function(em) {
       return (
          em.description.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
          // em.tags.includes(value) ||
          em.tags.findIndex(tag => tag.toLowerCase().indexOf(value.toLowerCase()) >= 0) >= 0
       )
    }

    if (value !=='') {
      filtered = emojiList.filter(filter)
    }



    this.setState({
      emojis: filtered
    })
  }

  copyMode = (event, emoji, index) => {
    const app = document.getElementById('root')
    const input = document.createElement('input')
    const target = event.target
    input.className = 'copy-placeholder'
    input.value = emoji

    target.classList.add('is-copying')
    app.appendChild(input)
    input.select()
    document.execCommand('copy')
    input.remove()
    this.setState({
      isHover: index
    })

    setTimeout(() => {
      target.classList.remove('is-copying')
      this.setState({
        isHover: null
      })
    }, 300)
  }

  showTooltip = (index) => {
    this.setState({
      isHover: index
    })
  }

  hideTooltip = (index) => {
    this.setState({
      isHover: null
    })
  }

  updateLimit = (event) => {
    let limit = event.target.value;

    if (limit.toLowerCase() === 'all') {
      limit = 2000
    }

    this.setState({
      limit
    })
  }

  render() {
    // Hanya tampilkan emoji lama (support desktop)
    // Todo: Buat filter untuk menampilkan emoji berdasarkan versi misal: ['> 5', '> 9', '> 10']
    const filtered = this.state.emojis.filter(em => parseInt(em.unicode_version, 10) < 9)
    return (
      <React.Fragment>
        <GlobalStyle />
        <Wrapper>
          <SearchField searchEmoji={this.handleChange} updateLimit={this.updateLimit} />
          <EmojiBox>{this.renderEmoji(filtered)}</EmojiBox>
        </Wrapper>
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);