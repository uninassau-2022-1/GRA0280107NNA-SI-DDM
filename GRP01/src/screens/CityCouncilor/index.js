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
    description: 'Partido dos esportes',
    title: '91 PEsp - Partido dos Esportes',
    candidates: [
      { name: 'Golfe', number: '91001', pic: require('../../assets/imgs/golfe.png') },
      { name: 'Beisebol', number: '91002', pic: require('../../assets/imgs/beisebol.png') },
      { name: 'Ginástica Artística', number: '91003', pic: require('../../assets/imgs/ginastica.png') },
    ],
  },
  {
    number: '92',
    acronym: 'PMus',
    description: 'Partido dos Ritmos Musicais',
    title: '92 PMus - Partido dos Ritmos Musicais',
    candidates: [
      { name: 'Rock', number: '92001', pic: require('../../assets/imgs/rock.png') },
      { name: 'Sertanejo', number: '92002', pic: require('../../assets/imgs/sertanejo.png') },
      { name: 'Música Popular Brasileira', number: '92003', pic: require('../../assets/imgs/musicaPopBr.png') },
    ],
  },
  {
    number: '93',
    acronym: 'PProf',
    description: 'Partido das Profissões',
    title: '93 PProf - Partido das Profissões',
    candidates: [
      { name: 'Astronauta', number: '93001', pic: require('../../assets/imgs/astronauta.png') },
      { name: 'Pintor', number: '93002', pic: require('../../assets/imgs/pintor.png') },
      { name: 'Enfermeira', number: '93003', pic: require('../../assets/imgs/enfermeira.png') },
    ],
  },
  {
    number: '94',
    acronym: 'PFest',
    description: 'Partido das Festas Populares',
    title: '94 PFest - Partido das Festas Populares',
    candidates: [
      { name: 'Páscoa', number: '94001', pic: require('../../assets/imgs/pascoa.png') },
      { name: 'Oktoberfest', number: '94002', pic: require('../../assets/imgs/oktoberfest.png') },
      { name: 'Reveillon', number: '94003', pic: require('../../assets/imgs/reveillon.png') },
    ],
  },
  {
    number: '95',
    acronym: 'PFolc',
    description: 'Partido do Folclore',
    title: '95 PFolc - Partido do Folclore',
    candidates: [
      { name: 'Curupira', number: '95001', pic: require('../../assets/imgs/curupira.png') },
      { name: 'Cabra Cabriola', number: '95002', pic: require('../../assets/imgs/cabraCabriola.png') },
      { name: 'Cuca', number: '95003', pic: require('../../assets/imgs/cuca.png') },
    ],
  },
];

export function CouncilorDrawerContent() {
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
        {section.candidates.map(item => {
          return (
            <View key={item.number} style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
              <View style={{alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 23, backgroundColor: '#e2e0e2' }}>
                <Image 
                  style={{ width: 40, height: 40, }}
                  source={item.pic} 
                />
              </View>

              <View style={{ marginLeft: 10, }}>
                <Text style={{ color: '#000', fontWeight: '600' }}>{item.name}</Text>
                <Text style={{ fontWeight: '600', color: '#959595' }}>{item.number}</Text>
              </View>
            </View>
          );
        })}
      </>
    );
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={{ flex: 1, marginLeft: 10, }}
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

const CityCouncilor = ({ navigation }) => {
  let opacity = useRef(new Animated.Value(1)).current;
  const [animate, setAnimate] = useState(true);

  if (animate) {
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
  };

  const [voteNumber, setVoteNumber] = useState([
    { value: '', active: true },
    { value: '', active: false },
    { value: '', active: false },
    { value: '', active: false },
    { value: '', active: false },
  ]);

  const [input, setInput] = useState('');
  const [invalidNumber, setInvalidNumber] = useState(false);
  const [candidateName, setCandidateName] = useState('');
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
            if (i === 4) {
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
                  setCaptionVote(true);
                  break;
                } 
              }
              if (party === '') {
                setInvalidNumber(true);
                setNullVote(true);
              }
            } else if (i === 4) {
              let name = '';
              for (let i = 0; i < parties.length; i++) {
                const item = parties[i];

                if (item.number === n.slice(0, 2)) {
                  for (let j = 0; j < item.candidates.length; j++) {
                    const element = item.candidates[j];
                    if (element.number === n) {
                      name = element.name;
                      console.log(name)
                      setCandidateName(name);
                      setCaptionVote(false);
                      break;
                    }
                  }
                }
              }
              name === '' && invalidNumber === false ? setNonexistentCandidate(true) : false;
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
                  routes: [{ name: 'Mayor' }]
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

  let img;
  switch (candidateName) {
    case 'Golfe':
      img = require('../../assets/imgs/golfe.png');
      break;
    case 'Beisebol':
      img = require('../../assets/imgs/beisebol.png');
      break;
    case 'Ginástica Artística':
      img = require('../../assets/imgs/ginastica.png');
      break;
    case 'Rock':
      img = require('../../assets/imgs/rock.png');
      break;
    case 'Sertanejo':
      img = require('../../assets/imgs/sertanejo.png');
      break;
    case 'Música Popular Brasileira':
      img = require('../../assets/imgs/musicaPopBr.png');
      break;
    case 'Astronauta':
      img = require('../../assets/imgs/astronauta.png');
      break;
    case 'Pintor':
      img = require('../../assets/imgs/pintor.png');
      break;
    case 'Enfermeira':
      img = require('../../assets/imgs/enfermeira.png');
      break;
    case 'Páscoa':
      img = require('../../assets/imgs/pascoa.png');
      break;
    case 'Oktoberfest':
      img = require('../../assets/imgs/oktoberfest.png');
      break;
    case 'Reveillon':
      img = require('../../assets/imgs/reveillon.png');
      break;
    case 'Curupira':
      img = require('../../assets/imgs/curupira.png');
      break;
    case 'Cabra Cabriola':
      img = require('../../assets/imgs/cabraCabriola.png');
      break;
    case 'Cuca':
      img = require('../../assets/imgs/cuca.png');
      break;
    default:
      break;
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle='light-content' backgroundColor='#22252A' />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>SEU VOTO PARA VEREADOR</Text>

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

        <View style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e2e0e2', borderRadius: 60, width: 100, height: 100  }}>
          <Image 
            source={img}
            style={{ width: 90, height: 90 }}
          />
        </View>

        {!blankVote && (
          <View>
            <View style={styles.candidateInfoContainer}>
              <Text style={styles.candidateInfoText}>NOME: </Text>
              <Text style={styles.candidateInfoText}>{candidateName}</Text>
            </View>

            <View style={styles.candidateInfoContainer}>
              <Text style={styles.candidateInfoText}>PARTIDO: </Text>
              <Text style={styles.candidateInfoText}>{partyName}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={styles.showCandidates}>VISUALIZAR CANDIDATOS</Text>
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

export default CityCouncilor;
