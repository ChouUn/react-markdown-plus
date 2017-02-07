import React, { Component, PropTypes } from 'react';

import getMarkdown from './render';

function getStyles(props, context) {
  const styles = {
    root: {
      margin: '50px auto',
      maxWidth: 512,
    },
  };

  return styles;
}

class Markdown extends Component {
  static propTypes = {
    style: PropTypes.object,
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
    text: '',
  };

  render() {
    const {
      style,
      text,
    } = this.props;

    const styles = getStyles(this.props, this.context);

    const markdown = getMarkdown();

    return (
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{__html: markdown.render(text)}}
        style={Object.assign({}, styles.root, style)}
      />
    );
  }
}

export default Markdown;