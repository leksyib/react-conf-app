import React, { Component, PropTypes } from 'react';
import {
	Image,
	LayoutAnimation,
	PixelRatio,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import MapView from 'react-native-maps';

import ListTitle from '../../components/ListTitle';
import Navbar from '../../components/Navbar';
import Scene from '../../components/Scene';

import { list as organiserList } from '../../data/organisers';
import theme from '../../theme';
import { attemptToOpenUrl } from '../../utils';

import CodeOfConduct from './components/CodeOfConduct';
import Organiser from './components/Organiser';

// Santa Clara, California
const mapRegion = {
	latitude: 37.354108,
	longitude: -121.955236,
	latitudeDelta: 0.01,
	longitudeDelta: 0.01,
};

export default class Info extends Component {
	constructor (props) {
		super(props);

		this.toggleModal = this.toggleModal.bind(this);

		this.state = {
			modalIsOpen: false,
		};
	}
	toggleModal () {
		LayoutAnimation.easeInEaseOut();
		this.setState({ modalIsOpen: !this.state.modalIsOpen });
	}
	openMap () {
		const url = `http://maps.apple.com/?ll=${mapRegion.latitude},${mapRegion.longitude}`;

		attemptToOpenUrl(url);
	}
	openThinkmill () {
		const url = 'https://www.thinkmill.com.au';

		attemptToOpenUrl(url);
	}
	render () {
		const { navigator, organisers } = this.props;
		const { modalIsOpen } = this.state;

		return (
			<Scene scroll scrollEnabled={!modalIsOpen}>
				<Navbar
					title="Event Info"
					leftButtonIconName="ios-arrow-back"
					leftButtonOnPress={navigator.popToTop}
				/>
				<MapView initialRegion={mapRegion} style={styles.map}>
					<MapView.Marker
						coordinate={mapRegion}
						title="React Conf 2017"
					/>
				</MapView>

				<View style={{ flex: 1 }}>
					<View style={styles.hero}>
						<Text style={styles.heroText}>
							The conference will be taking place on February 22nd and 23rd, with talks from 10am to 6pm each day. Plan to hang out with us each evening for plenty of socializing over food and drink
						</Text>
						<TouchableOpacity onPress={this.toggleModal} activeOpacity={0.75}>
							<Text style={styles.heroLink}>
								Code of Conduct
							</Text>
						</TouchableOpacity>
					</View>

					<ListTitle text="Organisers" />
					{organisers.map((organiser, idx) => {
						const onPress = () => {};

						return (
							<Organiser
								avatar={organiser.avatar}
								key={idx}
								onPress={onPress}
								name={organiser.name}
								summary={organiser.summary}
							/>
						);
					})}

					<View style={styles.madeby}>
						<TouchableOpacity onPress={this.openThinkmill} activeOpacity={0.75} style={styles.madebyLink}>
							<Image
								source={require('./images/thinkmill-logo.png')}
								style={{ width: 80, height: 80 }}
							/>
							{/* <Text style={[styles.madebyText, styles.madebyTitle]}>Made by Thinkmill</Text> */}
						</TouchableOpacity>
						<Text style={styles.madebyText}>
							React Conf App made with love in Sydney, Australia, and open sourced by Thinkmill
						</Text>
						<Text style={styles.madebyText}>
							github.com/Thinkmill/react-conf-2017
						</Text>
					</View>
				</View>

				{!!modalIsOpen && <CodeOfConduct onClose={this.toggleModal} />}
			</Scene>
		);
	}
};

Info.propTypes = {
	navigator: PropTypes.object.isRequired,
	organisers: PropTypes.array.isRequired,
};
Info.defaultProps = {
	organisers: organiserList,
};

const styles = StyleSheet.create({
	map: {
		flex: 1,
		height: 200,
		maxHeight: 200,
	},
	// hero
	hero: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderBottomColor: theme.color.gray20,
		borderBottomWidth: 1 / PixelRatio.get(),
		borderTopColor: theme.color.gray30,
		borderTopWidth: 1 / PixelRatio.get(),
		paddingHorizontal: theme.fontSize.default,
		paddingTop: theme.fontSize.xlarge,
	},
	heroText: {
		fontSize: theme.fontSize.default,
		fontWeight: '300',
		lineHeight: theme.fontSize.large,
		textAlign: 'center',
	},
	heroLink: {
		color: theme.color.blue,
		fontSize: theme.fontSize.default,
		fontWeight: '500',
		padding: theme.fontSize.large,
	},

	// made by thinkmill
	madeby: {
		alignItems: 'center',
		paddingHorizontal: theme.fontSize.default,
		paddingVertical: theme.fontSize.xlarge,
	},
	madebyLink: {
		alignItems: 'center',
	},
	madebyText: {
		fontSize: theme.fontSize.default,
		fontWeight: '300',
		lineHeight: theme.fontSize.large,
		marginTop: theme.fontSize.default,
		textAlign: 'center',
	},
	madebyTitle: {
		fontWeight: '500',
	},
});
