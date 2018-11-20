import React, { Component } from "react"
import PropTypes from "prop-types"
import AceEditor from "react-ace"
import styled from "styled-components"
import { HotKeys } from "react-hotkeys"

// editor config
import "brace/mode/javascript"
import "brace/mode/scheme"
import "brace/theme/monokai"
import "brace/keybinding/vim"
import "brace/ext/language_tools"

import beautify from "../utils/beautify"

const keymap = {
  prettify: "command+ctrl+p",
  vim: "command+ctrl+v",
  next: "command+ctrl+n",
  again: "command+ctrl+1",
  good: "command+ctrl+2",
  easy: "command+ctrl+3",
  runCode: "command+enter",
}

class Editor extends Component {
  onBeautifyCode = () => {
    const code = beautify(this.props.value)
    if (!code.error) {
      this.props.onChange(code.code)
    }
  }

  cleanEditor = () => {
    this.props.onChange("")
  }

  render() {
    const {
      vim,
      onChange,
      value,
      height,
      width,
      language,
      noGutter,
      toggleVim,
      again,
      good,
      easy,
      runCode,
    } = this.props
    const handlers = {
      prettify: this.onBeautifyCode,
      vim: toggleVim,
      again,
      good,
      easy,
      runCode: runCode || this.cleanEditor,
    }

    return (
      <EditorStyled>
        <HotKeys
          style={{ height: "inherit" }}
          keyMap={keymap}
          handlers={handlers}
        >
          <AceEditor
            value={value}
            mode={language === "reasonml" ? "scheme" : "javascript"}
            onChange={onChange}
            fontSize="12pt"
            focus
            height={height}
            width={width}
            showGutter={noGutter}
            keyboardHandler={vim ? "vim" : ""}
            tabSize={2}
            theme={"monokai"}
            name="Editor"
            cursorStart={2}
            setOptions={{
              highlightActiveLine: false,
              useWorker: false,
              fontFamily: "Monaco",
              enableBasicAutocompletion: true,
              wrap: 80,
            }}
            editorProps={{ $blockScrolling: true }}
          />
        </HotKeys>
      </EditorStyled>
    )
  }
}

const EditorStyled = styled.section`
  height: 100%;
  outline: none;
  font-family: monaco !important;
  .ace_editor {
    border-radius: 1rem;
  }
  .ace_scrollbar-v {
    color: black;
    overflow: hidden;
  }
  .ace_scrollbar-h {
    overflow: hidden;
  }
`
Editor.defaultProps = {
  noGutter: false,
  height: "inherit",
  width: "inherit",
  runCode: () => {},
}

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  vim: PropTypes.bool.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  language: PropTypes.string.isRequired,
  again: PropTypes.func.isRequired,
  good: PropTypes.func.isRequired,
  easy: PropTypes.func.isRequired,
  noGutter: PropTypes.bool,
  toggleVim: PropTypes.func.isRequired,
  runCode: PropTypes.func,
}

export default Editor
