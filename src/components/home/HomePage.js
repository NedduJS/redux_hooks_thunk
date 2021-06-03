import React from 'react';
import { connect } from 'react-redux';

import Card from '../card/Card';
import {
  removeCharacterAction,
  addToFavoriteAction,
} from '../../redux/chars/charsAction';

import styles from './home.module.css';

function Home({ chars, removeCharacterAction, addToFavoriteAction }) {
  function renderCharacter() {
    const char = chars[0];
    return <Card leftClick={nextCharacter} rightClick={addFav} {...char} />;
  }

  const nextCharacter = () => {
    removeCharacterAction();
  };

  const addFav = () => {
    addToFavoriteAction();
  };

  return (
    <div className={styles.container}>
      <h2>Personajes de Rick y Morty</h2>
      <div>{renderCharacter()}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    chars: state.characters.array,
  };
};

const mapDispatchToProps = {
  removeCharacterAction,
  addToFavoriteAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
