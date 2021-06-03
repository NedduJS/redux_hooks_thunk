import React from 'react';
import { connect } from 'react-redux';

import { doGoogleLoginAction, logOutAction } from '../../redux/user/userAction';

import styles from './login.module.css';

function LoginPage({ loggedIn, fetching, doGoogleLoginAction, logOutAction }) {
  const doLogin = () => {
    doGoogleLoginAction();
  };

  const logOut = () => {
    logOutAction();
  };

  if (fetching) return <h2>Cargando...</h2>;

  return (
    <div className={styles.container}>
      {loggedIn ? (
        <>
          <h1>Cierra tu sesión</h1>
          <button onClick={logOut}>Cerrar Sesión</button>{' '}
        </>
      ) : (
        <>
          <h1>Inicia Sesión con Google</h1>
          <button onClick={doLogin}>Iniciar</button>
        </>
      )}
    </div>
  );
}

const mapStateToProps = ({ user: { fetching, loggedIn } }) => {
  return {
    fetching,
    loggedIn,
  };
};

const mapDispatchToProps = {
  doGoogleLoginAction,
  logOutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
