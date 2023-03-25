import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import HeightContext from './HeightContext';
import {Switch} from 'react-native-switch';
import Lineargradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('screen');
let layoutHeight = 50;

type HomeTypes = {
  themeColor: boolean;
  handleTheme: (value: boolean) => Function;
};

type TextTypes = {
  widthProp: string;
  children: string;
  themeColor: boolean;
  callback: () => unknown;
};

const ViewWrapper = function (props: {children: React.ReactNode}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopWidth: 0.5,
      }}>
      {props.children}
    </View>
  );
};

const TextWrapper = function (props: TextTypes) {
  const getHeight = useContext(HeightContext);

  return (
    <TouchableOpacity
      onPress={() => {
        props.callback((prevState: string) =>
          prevState === '0'
            ? props.children
            : isNaN(parseInt(props.children))
            ? prevState + ' ' + props.children + ' '
            : prevState + props.children,
        );
      }}
      style={[
        styles.column,
        {
          height: getHeight.height / 5,
          width: props.widthProp === 'normal' ? width / 4 : width / 1.334,
        },
      ]}>
      <Text
        style={[styles.text, {color: getHeight.darkTheme ? '#ffff' : '#333'}]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

const Home = ({handleTheme, themeColor}: HomeTypes) => {
  const [input, setInput] = useState<string>('0');
  const getHeight = useContext(HeightContext);

  return (
    <Lineargradient
      colors={themeColor ? ['#C28424', '#7e520d'] : ['#E2A74A', '#C79F60']}
      style={styles.home}>
      <View style={styles.header}>
        <Switch
          value={themeColor}
          onValueChange={handleTheme}
          containerStyle={{
            borderWidth: 3,
            borderColor: themeColor ? '#f4f4f4' : '#555',
          }}
          activeText={''}
          inActiveText={''}
          circleActiveColor={'#f4f4f4'}
          circleInActiveColor={'#555'}
          backgroundActive={'transparent'}
          backgroundInactive={'transparent'}
        />
      </View>

      {/* display */}
      <View style={styles.display}>
        <Text style={[styles.text, {textAlign: 'right', color: '#fff'}]}>
          {input}
        </Text>
      </View>

      {/* number pad */}
      <Lineargradient
        style={styles.main}
        colors={themeColor ? ['#634210', '#7e520d'] : ['#fefefe', '#f4f4f4']}
        onLayout={({nativeEvent}) =>
          getHeight.setHeight(nativeEvent.layout.height)
        }>
        <ViewWrapper>
          <TouchableOpacity
            onPress={() => setInput('0')}
            style={[
              styles.column,
              {height: getHeight.height / 5, width: width / 4},
            ]}>
            <Text
              style={[
                styles.text,
                {color: getHeight.darkTheme ? '#ffff' : '#333'},
              ]}>
              AC
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (input === '0') {
                return;
              }
              if (!/[\*|-|+|\/]/.test(input)) {
                const setIndicator =
                  Number(input) > 0
                    ? '-' + input
                    : input.slice(1, input.length);
                setInput(setIndicator);

                return;
              }
              var start;
              let end = input.length;
              Array.from(input).forEach((ltr, i) => {
                if (isNaN(parseInt(ltr)) && ltr !== '-') {
                  start = i + 1;
                } else if (ltr === '-') {
                  start = i;
                }
              });

              console.log(input.slice(start, end));
              const setIndicator =
                Number(input.slice(start, end)) > 0
                  ? '-' + input.slice(start, end)
                  : input.slice(start + 1, end);
              const word = input.slice(0, start) + setIndicator;
              setInput(word);
            }}
            style={[
              styles.column,
              {height: getHeight.height / 5, width: width / 4},
            ]}>
            <Text
              style={[
                styles.text,
                {color: getHeight.darkTheme ? '#ffff' : '#333'},
              ]}>
              +/-
            </Text>
          </TouchableOpacity>
          <TextWrapper widthProp={'normal'} callback={setInput}>
            %
          </TextWrapper>
          <TextWrapper widthProp={'normal'} callback={setInput}>
            /
          </TextWrapper>
        </ViewWrapper>
        <ViewWrapper>
          <TextWrapper widthProp={'normal'} callback={setInput}>
            7
          </TextWrapper>
          <TextWrapper widthProp={'normal'} callback={setInput}>
            8
          </TextWrapper>
          <TextWrapper widthProp={'normal'} callback={setInput}>
            9
          </TextWrapper>
          <TextWrapper widthProp={'normal'} callback={setInput}>
            *
          </TextWrapper>
        </ViewWrapper>
        <ViewWrapper>
          <TextWrapper widthProp={'normal'} callback={setInput}>
            6
          </TextWrapper>
          <TextWrapper widthProp={'normal'} callback={setInput}>
            5
          </TextWrapper>
          <TextWrapper widthProp={'normal'} callback={setInput}>
            4
          </TextWrapper>
          <TextWrapper widthProp={'normal'} callback={setInput}>
            -
          </TextWrapper>
        </ViewWrapper>
        <ViewWrapper>
          <TextWrapper widthProp={'normal'} callback={setInput}>
            1
          </TextWrapper>
          <TextWrapper widthProp={'normal'} callback={setInput}>
            2
          </TextWrapper>
          <TextWrapper widthProp={'normal'} callback={setInput}>
            3
          </TextWrapper>
          <TextWrapper widthProp={'normal'} callback={setInput}>
            +
          </TextWrapper>
        </ViewWrapper>
        <ViewWrapper>
          <TextWrapper widthProp={'not-normal'} callback={setInput}>
            0
          </TextWrapper>
          <Lineargradient colors={['#DCA650', '#85570F']}>
            <TouchableOpacity
              onPress={() => {
                const result = Function('return ' + input)();
                setInput(result);
              }}
              style={[
                styles.column,
                {
                  height: getHeight.height / 5,
                  width: width / 4,
                },
              ]}>
              <Text style={[styles.text, {color: '#ffff'}]}>=</Text>
            </TouchableOpacity>
          </Lineargradient>
        </ViewWrapper>
      </Lineargradient>
    </Lineargradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  switch: {
    borderWidth: 1,
    borderColor: '#f4f4f4',
  },
  main: {
    width: '100%',
    height: height / 2,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
  },
  column: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  text: {
    fontSize: 25,
    fontWeight: '600',
  },
  display: {position: 'absolute', top: '40%', width: '100%', paddingRight: 20},
});
