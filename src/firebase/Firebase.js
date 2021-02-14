import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import ReduxSagaFirebase from 'redux-saga-firebase'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

class Firebase {
  constructor() {
    const firebaseApp = firebase.initializeApp(config)
    this.rsf = new ReduxSagaFirebase(firebaseApp)
    this.auth = this.rsf.auth
    this.db = this.rsf.firestore
    this.storage = this.rsf.storage
  }

  // Auth API
  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  signOut = () => this.auth.signOut()

  passwordReset = email => this.auth.sendPasswordResetEmail(email)

  passwordUpdate = password => this.auth.updatePassword(password)

  getCurrentUser = () => firebase.auth().currentUser

  onAuthStateChange = user => firebase.auth().onAuthStateChanged(user)

  deleteUser = () => firebase.auth().currentUser.delete()

  reauthenticateWithCredential = (credential, next, onError) => {
    const user = this.auth.currentUser
    user
      .reauthenticateWithCredential(credential)
      .then(next())
      .catch(err => onError(err))
  }

  onAuthUserListener = (next, fallback) => {
    return this.onAuthStateChange(authUser => {
      if (authUser) {
        next(authUser)
      } else {
        fallback()
      }
    })
  }

  // Firestore API
  addDocument = (collectionName, document) =>
    this.db.addDocument(collectionName, document)

  getDocument = docRef => this.db.getDocument(docRef)

  syncDocument = (docRef, options) => this.db.syncDocument(docRef, options)

  deleteDocument = docRef => this.db.deleteDocument(docRef)

  getCollection = collectionName => this.db.getCollection(collectionName)

  getChannel = ref => this.db.channel(ref)

  syncCollection = (ref, options) => this.db.syncCollection(ref, options)

  syncCollectionRef = () => this.db.syncCollection

  getCollectionRef = () => this.db.getCollection

  getFirestoreCollectionOrder = (collectionName, prop) =>
    firebase.firestore().collection(collectionName).orderBy(prop)

  setDocument = (docRef, data, options) =>
    this.db.setDocument(docRef, data, options)

  updateDocument = (docRef, prop, value) =>
    this.db.updateDocument(docRef, prop, value)

  updateNotesUsersDisplayNameOnUpdateProfile = (
    collectionName,
    userId,
    displayName
  ) => {
    const collection = firebase.firestore().collection(collectionName)

    collection.get().then(response => {
      const batch = firebase.firestore().batch()
      response.docs.forEach(doc => {
        const note = { id: doc.id, ...doc.data() }
        if (note.author.uid === userId) {
          const author = { ...note.author, displayName }
          const docRef = firebase
            .firestore()
            .collection(collectionName)
            .doc(doc.id)
          batch.update(docRef, { ...note, author })
        }
        if (note.pickers && note.pickers.length > 0) {
          const pickers = note.pickers.map(picker =>
            picker.uid === userId ? { ...picker, displayName } : picker
          )
          const docRef = firebase
            .firestore()
            .collection(collectionName)
            .doc(doc.id)
          batch.update(docRef, { ...note, pickers })
        }
      })

      batch.commit().then(() => {
        console.log(`updated all documents inside ${collectionName}`)
      })
    })
  }

  // Storage API
  uploadFile = (path, file) => {
    return this.storage.uploadFile(path, file)
  }

  deleteFile = path => this.storage.deleteFile(path)

  getDownloadURL = fileRef => this.storage.getDownloadURL(fileRef)

  storageRef = () => firebase.storage().ref()

  // Utils API
  transformDbUserToSafeUser = firebaseUser => {
    const userProperties = [
      'displayName',
      'email',
      'photoURL',
      'uid',
      'isAdmin'
    ]

    return userProperties.reduce((obj, prop) => {
      return prop in firebaseUser ? { ...obj, [prop]: firebaseUser[prop] } : obj
    }, Object.create(null))
  }
}

export default new Firebase()
