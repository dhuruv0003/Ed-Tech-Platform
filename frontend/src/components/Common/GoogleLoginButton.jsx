import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

const GoogleLoginButton = ({ onClick }) => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <div className="w-full">
      <GoogleLogin
        onSuccess={credentialResponse => {
          onClick(credentialResponse.credential)
        }}
        onError={() => console.log('Login Failed')}
        theme="filled_blue"
        size="large"
        text="continue_with"
        shape="rectangular"
        width="100%"
      />
    </div>
  </GoogleOAuthProvider>
)

export default GoogleLoginButton