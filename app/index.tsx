import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Platform, TouchableOpacity, Modal, TextInput, Image, Alert
} from 'react-native';
import { api } from "../scripts/api";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

export default function Index() {
  return <Redirect href="/ManChao" />;
}