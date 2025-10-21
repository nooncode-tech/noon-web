import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

interface LoginViewProps {
    onSuccess: (response: CredentialResponse) => void;
}

export const LoginView = ({ onSuccess }: LoginViewProps) => {
    return (
        <div className="flex flex-col items-center justify-center flex-1 bg-[var(--principal-background-color)] rounded-b-3xl gap-6 p-8 text-center">
            <div className="text-lg font-bold text-white">
                Welcome! I'm here for you
            </div>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={() => alert("Google login failed. Please try again.")}
                useOneTap
            />
        </div>
    );
};