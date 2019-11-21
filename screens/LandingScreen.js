import React from 'react';
import styled from 'styled-components';
import { Animated, Easing, Dimensions } from 'react-native';
import LandingButton from '../components/LandingButton.js';
import { spacing } from '../constants/Index';
import i18n from '../i18n/index.js'
import db from '../api.js';
import LoadingOverlay from '../components/LoadingOverlay';

const backgroundImg = require('../assets/landing-bg.png');
const logo = require('../assets/ezbylao.png');
let WIDTH = Dimensions.get('screen').width

class LandingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
						left: new Animated.Value(0),
						loadAuth: true,
        };
    }
    async componentDidMount() {
			let signed = await db.isSignedIn()
			if(signed) {
				this.setState({loadAuth: false})
				this.props.navigation.navigate('Home')
				return
			}
			this.setState({loadAuth: false})
			const { left } = this.state;
			Animated.loop(
					Animated.sequence([
							Animated.timing(left, {
									toValue: -500,
									duration: 60000,
									easing: Easing.linear,
							}),
					]),
			).start();
    }

    render() {
			console.log(WIDTH)
        const { left, loadAuth } = this.state;
				const { navigation } = this.props;
				if(loadAuth) {
					return (
						<LoadingOverlay />
					)
				}
        return (
            <RootView>
                <AnimatedBackgroundWrapper style={{ left }}>
                    <LandingBackground source={backgroundImg} />
                </AnimatedBackgroundWrapper>
								<LogoApp source={logo}/>

                <ButtonWrapper>
									<LandingButton
												primary
												text={i18n.t("sign_in")}
												margin={
														`${spacing.tiny}px ${spacing.medium}px ` +
														`0 ${spacing.medium}px`
												}
												action={() => {
														navigation.push('SignIn');
												}}
										/>
                    <LandingButton
                        text={i18n.t("create_account")}
                        action={() => {
                            navigation.push('CreateAccount');
                        }}
                    />

                </ButtonWrapper>
						</RootView>
        );
    }
}

export default LandingScreen;

const RootView = styled.View`
    flex: 1;
`;

const BackgroundWrapper = styled.View`
    height: 100%;
    width: 500%;
    opacity: 0.7;
`;

const LandingBackground = styled.ImageBackground`
    height: 100%;
`;

const LogoApp = styled.Image`
		height: 57px;
		width: 260px;
		position: absolute;
		top: 35%;
		left: ${(WIDTH - 260) /2}px;
		resize-mode: contain;
`;

const AnimatedBackgroundWrapper = Animated.createAnimatedComponent(
    BackgroundWrapper,
);

const ButtonWrapper = styled.View`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 40px;
`;
