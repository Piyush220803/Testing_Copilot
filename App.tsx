import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  CopilotProvider,
  useCopilot,
  CopilotStep,
  walkthroughable,
} from 'react-native-copilot';

const WalkthroughableView = walkthroughable(View);
const WalkthroughableText = walkthroughable(Text);

const Navbar = () => (
  <View style={styles.navbar}>
    <Text style={styles.navbarLogo}>MyApp</Text>
    <View style={styles.navLinks}>
      <Text style={styles.navLink}>Home</Text>
      <Text style={styles.navLink}>About</Text>
    </View>
  </View>
);

const HeroSection = () => (
  <View style={styles.heroSection}>
    <Image
      source={{uri: 'https://picsum.photos/800/400'}}
      style={styles.heroImage}
    />
    <View style={styles.heroOverlay}>
      <Text style={styles.heroTitle}>Welcome to Our App</Text>
    </View>
  </View>
);

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>© 2025 MyApp. All rights reserved.</Text>
  </View>
);

// Tooltip Component
const CustomTooltip = ({handleNext, currentStep}) => (
  <View style={styles.tooltip}>
    <Text style={styles.tooltipText}>{currentStep?.text}</Text>
    <TouchableOpacity
      onPress={() => {
        console.log('Next button pressed');
        handleNext && handleNext();
      }}
      style={styles.tooltipButton}
      activeOpacity={0.8}>
      <Text style={styles.tooltipButtonText}>Next</Text>
    </TouchableOpacity>
  </View>
);

const AppContent = () => {
  const {start, copilotEvents} = useCopilot();

  React.useEffect(() => {
    const handleStepChange = step => {
      console.log('Step changed:', step);
    };

    const handleStart = () => {
      console.log('Tour started');
    };

    const handleStop = () => {
      console.log('Tour stopped');
    };

    copilotEvents.on('stepChange', handleStepChange);
    copilotEvents.on('start', handleStart);
    copilotEvents.on('stop', handleStop);

    return () => {
      copilotEvents.off('stepChange', handleStepChange);
      copilotEvents.off('start', handleStart);
      copilotEvents.off('stop', handleStop);
    };
  }, [copilotEvents]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <CopilotStep
            text="This is our navigation bar"
            order={1}
            name="navbar">
            <WalkthroughableView style={styles.stepContainer}>
              <Navbar />
            </WalkthroughableView>
          </CopilotStep>

          <CopilotStep
            text="Here's our beautiful hero section"
            order={2}
            name="hero">
            <WalkthroughableView style={styles.stepContainer}>
              <HeroSection />
            </WalkthroughableView>
          </CopilotStep>

          <CopilotStep text="Welcome to the app!" order={3} name="welcome">
            <WalkthroughableText style={styles.welcomeText}>
              Hello, Welcome to our App!
            </WalkthroughableText>
          </CopilotStep>

          <TouchableOpacity style={styles.startButton} onPress={() => start()}>
            <Text style={styles.startButtonText}>Start Tour</Text>
          </TouchableOpacity>

          <CopilotStep text="Our footer section" order={4} name="footer">
            <WalkthroughableView style={styles.stepContainer}>
              <Footer />
            </WalkthroughableView>
          </CopilotStep>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Root Component
const App = () => (
  <CopilotProvider
    tooltipComponent={CustomTooltip}
    overlay="view"
    animated={true}
    backdropColor="rgba(0, 0, 0, 0.4)"
    androidStatusBarVisible={false}
    tooltipStyle={{
      backgroundColor: 'rgba(44, 62, 80, 0.95)',
    }}
    labels={{
      next: 'Next',
    }}>
    <AppContent />
  </CopilotProvider>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },
  container: {
    flex: 1,
  },
  stepContainer: {
    marginBottom: 10,
    width: '100%',
  },
  navbar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#2c3e50',
  },
  navbarLogo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  navLinks: {
    flexDirection: 'row',
  },
  navLink: {
    color: '#fff',
    marginLeft: 16,
  },
  heroSection: {
    height: 200,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
  },
  startButton: {
    backgroundColor: '#2c3e50',
    padding: 15,
    borderRadius: 30,
    margin: 20,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
  },
  tooltip: {
    backgroundColor: 'rgba(44, 62, 80, 0.95)',
    borderRadius: 10,
    padding: 15,
    width: 250,
    maxWidth: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  tooltipButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    alignSelf: 'center',
    minWidth: 100,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipButtonText: {
    color: '#2c3e50',
    fontWeight: 'bold',
  },
});

export default App;
