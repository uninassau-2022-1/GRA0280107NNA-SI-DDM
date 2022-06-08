import React, { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { DrawerContentScrollView } from '@react-navigation/drawer';

import styles from './styles';

import Accordion from 'react-native-collapsible/Accordion';
// import * as Animatable from 'react-native-animatable';

const parties = [
  {
    number: '91',
    acronym: 'PEsp',
    description: 'Partido dos Esportes',
    mayor: { name: 'Natação', pic: require('../../assets/imgs/natacao.png') },
    viceMayor: { name: 'Judô', pic: require('../../assets/imgs/judo.png') },
  },
  {
    number: '92',
    acronym: 'PMus',
    description: 'Partido dos Ritmos Musicais',
    mayor: { name: 'Heavy Metal', pic: require('../../assets/imgs/heavyMetal.png') },
    viceMayor: { name: 'Salsa', pic: require('../../assets/imgs/salsa.png') },
  },
  {
    number: '93',
    acronym: 'PProf',
    description: 'Partido das Profissões',
    mayor: { name: 'Bombeira', pic: require('../../assets/imgs/bombeira.png') },
    viceMayor: { name: 'Detetive', pic: require('../../assets/imgs/detetive.png') },
  },
  {
    number: '94',
    acronym: 'PFest',
    description: 'Partido das Festas Populares',
    mayor: { name: 'Festa Junina', pic: require('../../assets/imgs/festaJunina.png') },
    viceMayor: { name: 'Festa do Milho', pic: require('../../assets/imgs/festaMilho.png') },
  },
  {
    number: '95',
    acronym: 'PFolc',
    description: 'Partido do Folclore',
    mayor: { name: 'Boto Cor de Rosa', pic: require('../../assets/imgs/boto.png') },
    viceMayor: { name: 'Mãe do Ouro', pic: require('../../assets/imgs/maeOuro.png') },
  },
];

export function MayorDrawerContent() {
  const [activeSections, setActiveSections] = useState([]);
  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  }

  const renderHeader = (section, _, isActive) => {
    return (
      <>
        <Text style={{ fontWeight: '600', marginVertical: 4, color: isActive ? 'green' : '#3B3F41' }}>
          {`${section.number} ${section.acronym} - ${section.description}`}
        </Text>
      </>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <>
        <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
          <View style={{alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 23, backgroundColor: '#e2e0e2' }}>
            <Image 
              style={{ width: 40, height: 40, }}
              source={section.mayor.pic} 
            />
          </View>

          <View style={{ marginLeft: 10, }}>
            <Text style={{ color: '#000', fontWeight: '600' }}>{section.mayor.name}</Text>
            <Text style={{ fontWeight: '600', color: '#959595' }}>Prefeito</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
          <View style={{alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 23, backgroundColor: '#e2e0e2' }}>
            <Image 
              style={{ width: 40, height: 40, }}
              source={section.viceMayor.pic} 
            />
          </View>

          <View style={{ marginLeft: 10, }}>
            <Text style={{ color: '#000', fontWeight: '600' }}>{section.viceMayor.name}</Text>
            <Text style={{ fontWeight: '600', color: '#959595' }}>Vice-Prefeito</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={{ flex: 1, marginLeft: 10 }}
    >
      <Accordion
        activeSections={activeSections}
        sections={parties}
        touchableComponent={TouchableOpacity}
        renderHeader={renderHeader}
        renderContent={renderContent}
        duration={400}
        onChange={setSections}
        renderAsFlatList={false}
      />
      
    </DrawerContentScrollView>
  );
};

const Mayor = ({ navigation }) => {
  let opacity = useRef(new Animated.Value(1)).current;
  let [animate, setAnimate] = useState(true);

  if (animate)
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: false
        })
      ])
    ).start();

  const [voteNumber, setVoteNumber] = useState([
    { value: '', active: true },
    { value: '', active: false },
  ]);
  const [input, setInput] = useState('');
  const [invalidNumber, setInvalidNumber] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [viceMayor, setViceMayor] = useState('');
  const [partyName, setPartyName] = useState('');

  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const VoteBox = ({ children, active }) => {
    return (
      <Animated.View style={[styles.voteBox, { opacity: active ? opacity : 1 }]}>
        <Text style={styles.voteDigit}>{children}</Text>
      </Animated.View>
    );
  }

  const [captionVote, setCaptionVote] = useState(false);
  const [nonexistentCandidate, setNonexistentCandidate] = useState(false);
  const [nullVote, setNullVote] = useState(false);

  const NumericKey = ({ children }) => {
    return (
      <TouchableOpacity
        style={styles.numericKey}
        disabled={blankVote ? true : false}
        onPress={() => {
          const array = [...voteNumber];
          let n = input;

          for (let i = 0; i < array.length; i++) {
            const item = array[i].value;

            if (i === array.length - 1 && array[i].value !== '') Alert.alert('O número do candidato está completo', 'Não é possível utilizar as teclas numéricas neste momento.')
            if (item !== '') continue;

            n = n + children;

            array[i].value = children;
            array[i].active = false;
            if (i === 1) {
              setAnimate(false);
            } else {
              array[i + 1].active = true;
            }
            setVoteNumber(array);
            setInput(n);

            if (i === 1) {
              let party = '';
              for (let i = 0; i < parties.length; i++) {
                const item = parties[i];
                if (item.number === n) {
                  party = `${item.description} (${item.acronym})`;
                  setPartyName(party);
                  setCandidateName(item.mayor.name);
                  setViceMayor(item.viceMayor.name);
                  //  setCaptionVote(true);
                  break;
                }
              }
              if (party === '') {
                setInvalidNumber(true);
                setNullVote(true);
              }
            }
            break;
          }
        }}
      >
        <Text style={styles.keyNumber}>{children}</Text>
      </TouchableOpacity>
    );
  }

  const [blankVote, setBlankVote] = useState(false);

  const OptionKey = ({ children, color }) => {
    return (
      <TouchableOpacity
        style={[styles.optionKey, { backgroundColor: color }]}
        onPress={() => {
          switch (children) {
            case 'CORRIGE':
              const array = [...voteNumber];
              if (array[0].value === '' && !blankVote) {
                Alert.alert('Atenção', 'Para utilizar o CORRIGE antes você deve informar algum número ou tocar em BRANCO')
              }
              for (let i = 0; i < array.length; i++) {
                array[i].value = '';
                if (i === 0) {
                  array[i].active = true;
                } else {
                  array[i].active = false;
                }
              }
              setVoteNumber(array);
              setInput('');
              setCandidateName('');
              setPartyName('');
              setInvalidNumber(false);
              setAnimate(true);
              setBlankVote(false);
              setCaptionVote(false);
              setNonexistentCandidate(false);
              setNullVote(false);
              setViceMayor('');
              break;
            case 'BRANCO':
              if (voteNumber[0].value === '') {
                setBlankVote(true);
                break;
              } else {
                setBlankVote(false);
                Alert.alert('Para votar em BRANCO o campo de voto deve estar vazio', 'Toque em CORRIGE para limpar o campo de voto')
              }
              break;
            case 'CONFIRMA':
              if ((voteNumber[0].value === '' || voteNumber[1].value === '') && !blankVote) {
                Alert.alert('Atenção', 'Para CONFIRMAR é necessário pelo menos informar o número do partido ou votar em BRANCO')
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'NewSimulation' }]
                });
              }
              break;
            default:
              break;
          }
        }}
      >
        <Text style={[styles.keyText, { color: children !== 'BRANCO' ? '#fff' : false }]}>{children}</Text>
      </TouchableOpacity>
    );
  }

  let mayorPic;
  let viceMayorPic;
  console.log(input)
  switch (input) {
    case '91':
      mayorPic = require('../../assets/imgs/natacao.png');
      viceMayorPic = require('../../assets/imgs/judo.png');
      break;
    case '92':
      mayorPic = require('../../assets/imgs/heavyMetal.png');
      viceMayorPic = require('../../assets/imgs/salsa.png');
      break;
    case '93':
      mayorPic = require('../../assets/imgs/bombeira.png');
      viceMayorPic = require('../../assets/imgs/detetive.png');
      break;
    case '94':
      mayorPic = require('../../assets/imgs/festaJunina.png');
      viceMayorPic = require('../../assets/imgs/festaMilho.png');
      break;
    case '95':
      mayorPic = require('../../assets/imgs/boto.png');
      viceMayorPic = require('../../assets/imgs/maeOuro.png');
      break;
    default:
      break;
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle='light-content' backgroundColor='#22252A' />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>SEU VOTO PARA PREFEITO</Text>

        {!blankVote && (
          <View style={styles.voteNumberContainer}>
            {voteNumber.map((item, index) => <VoteBox key={index} active={item.active}>{item.value}</VoteBox>)}
          </View>
        )}

        <View>
          {invalidNumber && (<Text style={styles.voteInfoText}>NÚMERO INVÁLIDO</Text>)}
          {nullVote && (<Text style={styles.voteInfoText}>VOTO NULO</Text>)}
          {nonexistentCandidate && (<Text style={styles.voteInfoText}>CANDIDATO INEXISTENTE</Text>)}
          {captionVote && (<Text style={styles.voteInfoText}>VOTO DE LEGENDA</Text>)}
          {blankVote && (<Text style={styles.voteInfoText}>VOTO EM BRANCO</Text>)}
        </View>

        <View style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e2e0e2', borderRadius: 50, width: 100, height: 100, marginRight: 10  }}>
            <Image 
              source={mayorPic}
              style={{ width: 90, height: 90 }}
            />
          </View>

          <View style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e2e0e2', borderRadius: 50, width: 85, height: 85  }}>
            <Image 
              source={viceMayorPic}
              style={{ width: 70, height: 70 }}
            />
          </View>
        </View>

        {!blankVote && (
          <View>
            <View style={styles.candidateInfoContainer}>
              <Text style={styles.candidateInfoText}>NOME: </Text>
              <Text style={styles.candidateInfoText}>{candidateName}</Text>
            </View>

            <View style={styles.candidateInfoContainer}>
              <Text style={styles.candidateInfoText}>VICE: </Text>
              <Text style={styles.candidateInfoText}>{viceMayor}</Text>
            </View>

            <View style={styles.candidateInfoContainer}>
              <Text style={styles.candidateInfoText}>PARTIDO: </Text>
              <Text style={styles.candidateInfoText}>{partyName}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={styles.showParties}>VISUALIZAR CANDIDATOS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.numericKeysContainer}>
          {keys.map(item => <NumericKey key={item}>{item}</NumericKey>)}
        </View>

        <View style={styles.optionKeysContainer}>
          <OptionKey color='#fff'>BRANCO</OptionKey>
          <OptionKey color='#b43a3d'>CORRIGE</OptionKey>
          <OptionKey color='#007234'>CONFIRMA</OptionKey>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Mayor;
