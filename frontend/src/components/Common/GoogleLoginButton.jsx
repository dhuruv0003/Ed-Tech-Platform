import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

const GoogleLoginButton = ({ onClick }) => (
 
  <GoogleOAuthProvider  clientId={'474553548129-k0bioq7d0i0ljcjcoflrkr8edqgs2et7.apps.googleusercontent.com'}>
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