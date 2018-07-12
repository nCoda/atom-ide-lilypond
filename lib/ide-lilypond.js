'use babel';

import IdeLilypondView from './ide-lilypond-view';
import { CompositeDisposable } from 'atom';

export default {

  ideLilypondView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ideLilypondView = new IdeLilypondView(state.ideLilypondViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ideLilypondView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ide-lilypond:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ideLilypondView.destroy();
  },

  serialize() {
    return {
      ideLilypondViewState: this.ideLilypondView.serialize()
    };
  },

  toggle() {
    console.log('IdeLilypond was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
