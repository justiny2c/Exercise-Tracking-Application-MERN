import React from 'react';
import '../App.css';

class Footer extends React.Component {
  render() {
    return (
      <div>
        <footer class='page-footer font-small blue'>
          <div class='footer-copyright text-center py-3'>
            © 2019 - Made by <a href='https://justinchen.dev'>Justin Chen</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
