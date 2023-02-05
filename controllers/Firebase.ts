import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "@firebase/auth";
import { ErrorMessage, StorageKeys } from "@/global/constants";

const firebaseConfig = {
	apiKey: "AIzaSyAGOdFT4ugf2XYCbnVb798BSHWGSvaO_YA",
	authDomain: "quicklink-fd10a.firebaseapp.com",
	projectId: "quicklink-fd10a",
	storageBucket: "quicklink-fd10a.appspot.com",
	messagingSenderId: "491957899687",
	appId: "1:491957899687:web:2e97088fad21df8b446682",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const SignInWithGoogle = async (): Promise<string | null> => {
	let _email: string | null = null;
	await signInWithPopup(auth, provider)
		.then((result) => {
			_email = result.user.email;
			if (_email == null) throw Error(ErrorMessage.GoogleAuthCompromised);
		})
		.catch((error) => {
			throw error;
		});
	return _email;
};

export const SignOutFromApp = async (): Promise<boolean> => {
	await signOut(auth)
		.then(() => {
			localStorage.setItem(StorageKeys.IsLoggedIn, "false");
			localStorage.setItem(StorageKeys.Hero, "");
			return true;
		})
		.catch((error) => {
			console.log(error);
			throw error;
		});
	return false;
};
