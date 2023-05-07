import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import {
  Text,
  Radio,
  RadioGroup,
  Input,
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Card,
} from "@ui-kitten/components";
import SubmitButton from "../components/Button/SubmitButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RadioButton } from "react-native-paper";
import AppText from "../components/Auth/AppText";
import axios from "axios";
import colors from "../config/colors";
import { FontAwesome } from "@expo/vector-icons";
import _serveToast from "../utils/_serveToast";
import { API } from "../config/baseUrl";

function ResponseScanner({ route, navigation }) {
  const responseData = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(null);

  const [readData, setReadData] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [joined, setJoined] = useState("");

  const [care, setCare] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [week, setWeek] = useState("");
  const [parity, setParity] = useState("");
  const [channel, setChannel] = useState("");
  const [language, setLanguage] = useState("");
  const [ownership, setOwnership] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [chps_zone, setChps_zone] = useState("");

  const [healthArea, setHealthArea] = useState("");
  const [services, setServices] = useState("");
  const [comments, setComments] = useState("");

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const regions = ["Northern", "North East", "Upper East", "Upper West"];


  // const regions = [
  //   {
  //     name: "northern",
  //     label: "Northern",
  //     districts: [
  //       { name: "sagnarigu", label: "Sagnarigu" },
  //       { name: "mion", label: "Mion" },
  //       { name: "nanton", label: "Nanton" },
  //       { name: "karaga", label: "Karaga" },
  //       { name: "gushiegu", label: "Gushiegu" },
  //       { name: "yendi_municipal", label: "Yendi Municipal" },
  //     ],
  //   },
  //   {
  //     name: "northeast",
  //     label: "North East",
  //     districts: [
  //       { name: "mamprugu_moagduri", label: "Mamprugu Moagduri" },
  //       { name: "east_mamprusi", label: "East Mamprusi" },
  //     ],
  //   },
  //   {
  //     name: "uppereast",
  //     label: "Upper East",
  //     districts: [
  //       { name: "bawku_west", label: "Bawku West" },
  //       { name: "bawku_municipal", label: "Bawku Municipal" },
  //       { name: "garu", label: "Garu" },
  //       { name: "tempane", label: "Tempane" },
  //     ],
  //   },
  //   {
  //     name: "upperwest",
  //     label: "Upper West",
  //     districts: [
  //       { name: "nadowli_kaleo", label: "Nadowli Kaleo" },
  //       { name: "sissala_east", label: "Sissala East" },
  //       { name: "sissala_west", label: "Sissala West" },
  //       { name: "daffiama_bussie_issa", label: "Daffiama Bussie Issa" },
  //       { name: "wa_east", label: "Wa East" },
  //     ],
  //   },
  // ];

  const districts = [
    {
      name: "sagnarigu",
      label: "Sagnarigu",
      subdistricts: [
        { name: "choggu", label: "Choggu" },
        { name: "garizegu", label: "Garizegu" },
        { name: "kamina", label: "Kamina" },
        { name: "malshegu", label: "Malshegu" },
        { name: "sagnarigu", label: "Sagnarigu" },
        { name: "taha", label: "taha" },
      ],
    },
    {
      name: "mion",
      label: "Mion",
      subdistricts: [
        { name: "jimli", label: "Jimli" },
        { name: "kpabia", label: "Kpabia" },
        { name: "kukpalgu", label: "Kukpalgu" },
        { name: "sambu", label: "Sambu" },
        { name: "sang", label: "Sang" },
      ],
    },
    {
      name: "nanton",
      label: "Nanton",
      subdistricts: [
        { name: "janjori_kukuo", label: "Janjori Kukuo" },
        { name: "nanton_sub", label: "Nanton" },
        { name: "nanton_kurugu", label: "Nanton Kurugu" },
        { name: "tampion", label: "Tampion" },
        { name: "zoggu", label: "Zoggu" },
      ],
    },
    {
      name: "karaga",
      label: "Karaga",
      subdistricts: [
        { name: "karaga_sub", label: "Karaga" },
        { name: "komoayili", label: "Komoayili" },
        { name: "nyong", label: "Nyong" },
        { name: "pishigu", label: "Pishigu" },
        { name: "sakulo", label: "Sakulo" },
        { name: "sandua", label: "Sandua" },
        { name: "tong", label: "Tong" },
        { name: "zandua", label: "Zandua" },
      ],
    },
    {
      name: "yendi_municipal",
      label: "Yendi Municipal",
      subdistricts: [
        { name: "adibo", label: "Adibo" },
        { name: "bumbong", label: "Bumbong" },
        { name: "ngani", label: "Ngani" },
        { name: "yendi_central", label: "Yendi Central" },
        { name: "yendi_east", label: "Yendi East" },
        { name: "yendi_west", label: "Yendi West" },
      ],
    },
    {
      name: "gushiegu",
      label: "Gushiegu",
      subdistricts: [
        { name: "galwei", label: "Galwei" },
        { name: "gushiegu_sub", label: "Gushiegu" },
        { name: "katani", label: "Katani" },
        { name: "kpatinga", label: "Kpatinga" },
        { name: "nabuli", label: "Nabuli" },
      ],
    },
    {
      name: "east_mamprusi",
      label: "East Mamprusi",
      subdistricts: [
        { name: "gambaga", label: "Gambaga" },
        { name: "gbintiri", label: "Gbintiri" },
        { name: "langbinsi", label: "Langbinsi" },
        { name: "nalerigu", label: "Nalerigu" },
        { name: "jawani", label: "Jawani" },
        { name: "kolinvai", label: "Kolinvai" },
        { name: "sakogu", label: "Sakogu" },
      ],
    },
    {
      name: "mamprugu_moagduri",
      label: "Mamprugu Moagduri",
      subdistricts: [
        { name: "kubori", label: "kubori" },
        { name: "kunkwa", label: "kunkwa" },
        { name: "yagaba", label: "yagaba" },
        { name: "yikpabongo", label: "yikpabongo" },
      ],
    },
    {
      name: "tempane",
      label: "Tempane",
      subdistricts: [
        { name: "basyonde", label: "Basyonde" },
        { name: "bugri", label: "Bugri" },
        { name: "gagbiri", label: "Gagbiri" },
        { name: "kpikpira", label: "Kpikpira" },
        { name: "tempane", label: "Tempane" },
        { name: "woriyanga", label: "Woriyanga" },
      ],
    },
    {
      name: "garu",
      label: "Garu",
      subdistricts: [
        { name: "denugu", label: "Denugu" },
        { name: "garu", label: "Garu" },
        { name: "kpatia", label: "Kpatia" },
        { name: "kpatua", label: "Kpatua" },
        { name: "kugri", label: "Kugri" },
        { name: "songa", label: "Songa" },
        { name: "worikambo", label: "Worikambo" },
      ],
    },
    {
      name: "bawku_west",
      label: "Bawku West",
      subdistricts: [
        { name: "binaba", label: "Binaba" },
        { name: "boya_gbantongo", label: "Boya/Gbantongo" },
        { name: "sapelliga_googo", label: "Sapelliga/Googo" },
        { name: "tanga_timonde", label: "Tanga/Timonde" },
        { name: "tilli_widnaba", label: "Tilli/Widnaba" },
        { name: "zebilla_north", label: "Zebilla North" },
        { name: "zebilla_south", label: "Zebilla South" },
        { name: "zongoire", label: "Zongoire" },
      ],
    },
    {
      name: "bawku_municipal",
      label: "Bawku Municipal",
      subdistricts: [
        { name: "baribari_bador", label: "Baribari Bador" },
        { name: "kuka_east", label: "Kuka East" },
        { name: "kuka_west", label: "Kuka West" },
        { name: "mognori", label: "Mognori" },
        { name: "north_natinga", label: "North Natinga" },
        { name: "south_natinga", label: "South Natinga" },
        { name: "urban_west", label: "Urban West" },
      ],
    },
    {
      name: "nadowli_kaleo",
      label: "Nadowli-Kaleo",
      subdistricts: [
        { name: "charikpong", label: "Charikpong" },
        { name: "dapuori", label: "Dapuori" },
        { name: "jang", label: "Jang" },
        { name: "kaleo", label: "Kaleo" },
        { name: "nadowli", label: "Nadowli" },
        { name: "nanvilli", label: "Nanvilli" },
        { name: "sombo", label: "Sombo" },
        { name: "takpo", label: "Takpo" },
      ],
    },
    {
      name: "sissala_east",
      label: "Sissala East",
      subdistricts: [
        { name: "kulfuo", label: "KULFUO" },
        { name: "kunchogu", label: "Kunchogu" },
        { name: "nabugubelle", label: "Nabugubelle" },
        { name: "nabulo", label: "Nabulo" },
        { name: "sakai", label: "Sakai" },
        { name: "tumu", label: "Tumu" },
        { name: "wellembelle", label: "Wellembelle" },
      ],
    },
    {
      name: "sissala_west",
      label: "Sissala West",
      subdistricts: [
        { name: "fielmuo", label: "Fielmuo" },
        { name: "gwollu", label: "Gwollu" },
        { name: "jawia", label: "Jawia" },
        { name: "jeffisi", label: "Jeffisi" },
        { name: "zini", label: "Zini" },
      ],
    },
    {
      name: "wa_east",
      label: "Wa East",
      subdistricts: [
        { name: "baayiri_naaha", label: "Baayiri /Naaha" },
        { name: "bulenga", label: "Bulenga" },
        { name: "funsi", label: "Funsi" },
        { name: "holomuni", label: "Holomuni" },
        { name: "kundungu", label: "Kundungu" },
        { name: "loggu", label: "Loggu" },
        { name: "yaala", label: "Yaala" },
      ],
    },
    {
      name: "daffiama_bussie_issa",
      label: "Daffiama Bussie Issa",
      subdistricts: [
        { name: "bussie", label: "Bussie" },
        { name: "daffiama", label: "Daffiama" },
        { name: "fian", label: "Fian" },
        { name: "issa", label: "Issa" },
        { name: "kojopkere", label: "Kojopkere" },
      ],
    },
  ];

  const subdistricts = [
    //NR -> Sagnarigu
    {
      name: "choggu",
      label: "Choggu",
      chps_zone: [
        { name: "gurugu_CHPS", label: "Gurugu CHPS" },
        { name: "naaluro_CHPS", label: "Naaluro CHPS" },
        { name: "sognaayili_CHPS", label: "Sognaayili CHPS" },
        { name: "garizegu_CHPS", label: "Garizegu CHPS" },
      ],
    },
    {
      name: "garizegu",
      label: "Garizegu",
      chps_zone: [{ name: "kpinjing_CHPS", label: "Kpinjing CHPS" }],
    },
    {
      name: "kamina",
      label: "Kamina",
      chps_zone: [
        { name: "dungu_CHPS", label: "Dungu CHPS" },
        { name: "gumani_CHPS", label: "Gumani CHPS" },
        { name: "kanvili_tunaayili_CHPS", label: "Kanvili-Tunaayili CHPS" },
        { name: "kogni_CHPS", label: "kogni CHPS" },
        { name: "gbanyamni_CHPS", label: "Gbanyamni CHPS" },
        { name: "zagyuri_CHPS", label: "Zagyuri CHPS" },
      ],
    },
    {
      name: "malshegu",
      label: "Malshegu",
      chps_zone: [
        { name: "katariga_CHPS", label: "Katariga CHPS" },
        { name: "kukuo_yapalsi_CHPS", label: "Kukuo Yapalsi CHPS" },
        { name: "malshegu_CHPS", label: "Malshegu CHPS" },
        { name: "sorogu_CHPS", label: "Sorogu CHPS" },
      ],
    },
    {
      name: "sagnarigu",
      label: "Sagnarigu",
      chps_zone: [
        { name: "kpene_CHPS", label: "Kpene CHPS" },
        { name: "shishegu_CHPS", label: "Shishegu CHPS" },
        { name: "tace_CHPS", label: "TACE CHPS" },
        { name: "bace_CHPS", label: "BACE CHPS" },
      ],
    },
    {
      name: "taha",
      label: "Taha",
      chps_zone: [
        { name: "fuo_CHPS", label: "Fuo CHPS" },
        { name: "gbrima_CHPS", label: "Gbrima CHPS" },
        { name: "gbalahi_CHPS", label: "Gbalahi CHPS" },
        { name: "kulaa_CHPS", label: "Kulaa CHPS" },
        { name: "nyanshegu_CHPS", label: "Nyanshegu CHPS" },
        { name: "taha_CHPS", label: "Taha CHPS" },
        { name: "ward_k_CHPS", label: "Ward K CHPS" },
        { name: "kalphin_CHPS", label: "Kalpohin CHPS" },
        { name: "estates_CHPS", label: "Eastes CHPS" },
        { name: "chntc_CHPS", label: "CHNTC CHPS" },
      ],
    },
    //NR -> Nanton
    {
      name: "janjori_kukuo",
      label: "Janjori Kukuo",
      chps_zone: [
        { name: "fazihini_CHPS", label: "Fazihini CHPS" },
        { name: "jana_CHPS", label: "Jana CHPS" },
        { name: "salkpaligu_CHPS", label: "Salkpaligu CHPS" },
      ],
    },
    {
      name: "nanton",
      label: "Nanton",
      chps_zone: [
        { name: "boaglini_CHPS", label: "Boaglini CHPS" },
        { name: "sanvilli_CHPS", label: "Sanvilli CHPS" },
        { name: "wazamafong_CHPS", label: "Wazamafong CHPS" },
        { name: "limamfong_CHPS", label: "Limamfong CHPS" },
        { name: "guntingli_CHPS", label: "Guntingli CHPS" },
        { name: "zieng_CHPS", label: "Zieng CHPS" },
      ],
    },
    {
      name: "nanton_kurugu",
      label: "Nanton Kurugu",
      chps_zone: [
        { name: "nanton_kurugu_CHPS", label: "Nanton Kurugu CHPS" },
        { name: "sandu_CHPS", label: "Sandu CHPS" },
        { name: "gbumgbum_CHPS", label: "Gbumgbum CHPS" },
      ],
    },
    {
      name: "tampion",
      label: "Tampion",
      chps_zone: [
        { name: "sahani_CHPS", label: "Sahani CHPS" },
        { name: "nagdigu_CHPS", label: "Nagdigu CHPS" },
        { name: "nayilifong_CHPS", label: "Nayilifong CHPS" },
        { name: "gumani_CHPS", label: "Gumani CHPS" },
      ],
    },
    {
      name: "zoggu",
      label: "Zoggu",
      chps_zone: [
        { name: "nyeko_CHPS", label: "Nyeko CHPS" },
        { name: "nyolgu_CHPS", label: "Nyolgu CHPS" },
        { name: "zokuga_CHS", label: "Zokuga CHS" },
      ],
    },
    //NR -> Karaga
    {
      name: "karaga",
      label: "Karaga",
      chps_zone: [
        { name: "karaga_central_CHPS", label: "Karaga Central CHPS" },
        { name: "karaga_east_CHPS", label: "Karaga East CHPS" },
        { name: "karaga_north_CHPS", label: "Karaga North CHPS" },
        { name: "karaga_west_CHPS", label: "Karaga West CHPS" },
        { name: "nangun_nayili_CHPS", label: "Nangun-Nayili CHPS" },
        { name: "nyengbalo_CHPS", label: "Nyengbalo CHPS" },
        { name: "nyingali_CHPS", label: "Nyingali CHPS" },
      ],
    },
    {
      name: "komoayili",
      label: "Komoayili",
      chps_zone: [
        { name: "komoayili_CHPS", label: "Komoayili CHPS" },
        { name: "binduli_CHPS", label: "Binduli CHPS" },
        { name: "monkula_CHPS", label: "Monkula CHPS" },
        { name: "yemo_karaga_CHPS", label: "Yemo-Karaga CHPS" },
      ],
    },
    {
      name: "nyong",
      label: "Nyong",
      chps_zone: [
        { name: "nyong_CHPS", label: "Nyong CHPS" },
        { name: "nyong_gumah_CHPS", label: "Nyong-Gumah CHPS" },
        { name: "bagurugu_CHPS", label: "Bagurugu CHPS" },
        { name: "tamalgu_CHPS", label: "Tamalgu CHPS" },
        { name: "zankali_CHPS", label: "Zankali CHPS" },
      ],
    },
    {
      name: "pishigu",
      label: "Pishigu",
      chps_zone: [
        { name: "pishigu_east_CHPS", label: "Pishigu East CHPS" },
        { name: "kpatariborgu_CHPS", label: "Kpatariborgu CHPS" },
        { name: "didogi_tamalgu_CHPS", label: "Didogi-Tamalgu CHPS" },
      ],
    },
    {
      name: "sakulo",
      label: "Sakulo",
      chps_zone: [
        { name: "sakulo_CHPS", label: "Sakulo CHPS" },
        { name: "tanyeli_CHPS", label: "Tanyeli CHPS" },
        { name: "namburugu_CHPS", label: "Namburugu CHPS" },
        { name: "gunayili_CHPS", label: "Gunayili CHPS" },
        { name: "guma_CHPS", label: "Guma CHPS" },
      ],
    },
    {
      name: "Sandua",
      label: "Sandua",
      chps_zone: [
        { name: "Binkonalori_CHPS", label: "Binkonalori CHPS" },
        { name: "Yibee_CHPS", label: "Yibee CHPS" },
        { name: "Sandua_CHPS", label: "Sandua CHPS" },
      ],
    },
    {
      name: "Tong",
      label: "Tong",
      chps_zone: [
        { name: "Nyensabga_CHPS", label: "Nyensabga CHPS" },
        { name: "Langogu_CHPS", label: "Langogu CHPS" },
        { name: "Sung_CHPS", label: "Sung CHPS" },
        { name: "Tong_CHPS", label: "Tong CHPS" },
      ],
    },
    {
      name: "Zandua",
      label: "Zandua",
      chps_zone: [
        { name: "Kpalsong_CHPS", label: "Kpalsong CHPS" },
        { name: "Takalgu_CHPS", label: "Takalgu CHPS" },
        { name: "Zandua_CHPS", label: "Zandua CHPS" },
        { name: "Bagli_CHPS", label: "Bagli CHPS" },
        { name: "Kokpilga_CHPS", label: "Kokpilga CHPS" },
      ],
    },
    //NR -> Yendi
    {
      name: "adibo",
      label: "Adibo",
      chps_zone: [
        { name: "Gbungbaliga_CHPS", label: "Gbungbaliga CHPS" },
        { name: "Kpalbilogni_CHPS", label: "Kpalbilogni CHPS" },
        { name: "Kuni_CHPS", label: "Kuni CHPS" },
        { name: "Nakpachie_CHPS", label: "Nakpachie CHPS" },
        { name: "Yimahegu_CHPS", label: "Yimahegu CHPS" },
        { name: "Zugu_CHPS", label: "Zugu CHPS" },
      ],
    },
    {
      name: "bumbong",
      label: "Bumbong",
      chps_zone: [
        { name: "Kulkpanga_CHPS", label: "Kulkpanga CHPS" },
        { name: "Nkwanta_CHPS", label: "Nkwanta CHPS" },
        { name: "Oseido_CHPS", label: "Oseido CHPS" },
        { name: "Pion_CHPS", label: "Pion CHPS" },
        { name: "Sunsong_CHPS", label: "Sunsong CHPS" },
      ],
    },
    {
      name: "ngani",
      label: "Ngani",
      chps_zone: [
        { name: "Borgni_CHPS", label: "Borgni CHPS" },
        { name: "Kamshegu_CHPS", label: "Kamshegu CHPS" },
        { name: "Kolgamado_CHPS", label: "Kolgamado CHPS" },
        { name: "Kpalgigbini_CHPS", label: "Kpalgigbini CHPS" },
        { name: "Kpanjamba_CHPS", label: "Kpanjamba CHPS" },
        { name: "Nogmado_CHPS", label: "Nogmado CHPS" },
        { name: "Tindang_CHPS", label: "Tindang CHPS" },
      ],
    },
    {
      name: "yendi_central",
      label: "Yendi Central",
      chps_zone: [
        { name: "Bini_CHPS", label: "Bini CHPS" },
        { name: "Gamanzei_CHPS", label: "Gamanzei CHPS" },
        { name: "Gundogu_CHPS", label: "Gundogu CHPS" },
      ],
    },
    {
      name: "yendi_ast",
      label: "Yendi East",
      chps_zone: [
        { name: "Kuga_CHPS", label: "Kuga CHPS" },
        { name: "Kunkon_CHPS", label: "Kunkon CHPS" },
        { name: "Meindogu_CHPS", label: "Meindogu CHPS" },
        { name: "Nayilifong_CHPS", label: "Nayilifong CHPS" },
        { name: "Wanbung_CHPS", label: "Wanbung CHPS" },
      ],
    },
    {
      name: "yendi_west",
      label: "Yendi West",
      chps_zone: [
        { name: "Kpalsanado_CHPS", label: "Kpalsanado CHPS" },
        { name: "Kumfong_CHPS", label: "Kumfong CHPS" },
        { name: "Motondo_CHPS", label: "Motondo CHPS" },
        { name: "Waliyepalla_CHPS", label: "Waliyepalla CHPS" },
        { name: "Zohe_CHPS", label: "Zohe CHPS" },
      ],
    },
    //NR -> Gushiegu
    {
      name: "galwei",
      label: "Galwei",
      chps_zone: [
        { name: "Galwei_CHPS", label: "Galwei CHPS" },
        { name: "Kpanashei_CHPS", label: "Kpanashei CHPS" },
        { name: "Zinindo_CHPS", label: "Zinindo CHPS" },
      ],
    },
    {
      name: "gushiegu",
      label: "Gushiegu",
      chps_zone: [
        { name: "Borgu_CHPS", label: "Borgu CHPS" },
        { name: "Bulugu_CHPS", label: "Bulugu CHPS" },
        { name: "Damankung_CHPS", label: "Damankung CHPS" },
        { name: "Garichefong_CHPS", label: "Garichefong CHPS" },
        { name: "Gushiegu_CHPS", label: "Gushiegu CHPS" },
        { name: "Kunnaayili_CHPS", label: "Kunnaayili CHPS" },
        { name: "Nakorgufong_CHPS", label: "Nakorgufong CHPS" },
        { name: "Nasandi_CHPS", label: "Nasandi CHPS" },
        { name: "Nayilifong_CHPS", label: "Nayilifong CHPS" },
        { name: "Salaa_CHPS", label: "Salaa CHPS" },
        { name: "Zamashegu_CHPS", label: "Zamashegu CHPS" },
        { name: "Zanteli_CHPS", label: "Zanteli CHPS" },
        { name: "Yeshei_CHPS", label: "Yeshei CHPS" },
      ],
    },
    {
      name: "katani",
      label: "Katani",
      chps_zone: [
        { name: "Katani_CHPS", label: "Katani CHPS" },
        { name: "Nawuhugu_CHPS", label: "Nawuhugu CHPS" },
      ],
    },
    {
      name: "kpatinga",
      label: "Kpatinga",
      chps_zone: [
        { name: "Gaa_CHPS", label: "Gaa CHPS" },
        { name: "Kpahakpaba_CHPS", label: "Kpahakpaba CHPS" },
        { name: "Maazijung_CHPS", label: "Maazijung CHPS" },
        { name: "Nakunga_CHPS", label: "Nakunga CHPS" },
        { name: "Sampeimo_CHPS", label: "Sampeimo CHPS" },
        { name: "Nayugu_CHPS", label: "Nayugu CHPS" },
      ],
    },
    {
      name: "nabuli",
      label: "Nabuli",
      chps_zone: [
        { name: "Kolig_CHPS", label: "Kolig CHPS" },
        { name: "Namangbani_CHPS", label: "Namangbani CHPS" },
        { name: "Nasuwei_CHPS", label: "Nasuwei CHPS" },
      ],
    },
    //NR -> Mion
    {
      name: "jimle",
      label: "Jimle",
      chps_zone: [
        { name: "Chegu_CHPS", label: "Chegu CHPS" },
        { name: "Nanvili_CHPS", label: "Nanvili CHPS" },
        { name: "Tidjo_CHPS", label: "Tidjo CHPS" },
      ],
    },
    {
      name: "kpabia",
      label: "Kpabia",
      chps_zone: [
        { name: "Afayili_CHPS", label: "Afayili CHPS" },
        { name: "Bofoyili_CHPS", label: "Bofoyili CHPS" },
        { name: "Buli_CHPS", label: "Buli CHPS" },
        { name: "Dabogni_CHPS", label: "Dabogni CHPS" },
        { name: "Nsojah_CHPS", label: "Nsojah CHPS" },
        { name: "Nyentou_CHPS", label: "Nyentou CHPS" },
        { name: "Tanado_CHPS", label: "Tanado CHPS" },
      ],
    },
    {
      name: "kukpalgu",
      label: "Kukpalgu",
      chps_zone: [
        { name: "Dombini_CHPS", label: "Dombini CHPS" },
        { name: "Tinsung_CHPS", label: "Tinsung CHPS" },
      ],
    },
    {
      name: "sambu",
      label: "Sambu",
      chps_zone: [
        { name: "Bachaborido_CHPS", label: "Bachaborido CHPS" },
        { name: "Kpunkpuno_CHPS", label: "Kpunkpuno CHPS" },
        { name: "Manyini_CHPS", label: "Manyini CHPS" },
        { name: "Nadundo_CHPS", label: "Nadundo CHPS" },
        { name: "Warivi_CHPS", label: "Warivi CHPS" },
      ],
    },
    {
      name: "sang",
      label: "Sang",
      chps_zone: [
        { name: "Kayoung_CHPS", label: "Kayoung CHPS" },
        { name: "Kulinkpegu_CHPS", label: "Kulinkpegu CHPS" },
        { name: "Sakpe_CHPS", label: "Sakpe CHPS" },
        { name: "Salankpang_CHPS", label: "Salankpang CHPS" },
        { name: "Sanzee_CHPS", label: "Sanzee CHPS" },
        { name: "Zakpalsi_CHPS", label: "Zakpalsi CHPS" },
      ],
    },
    //NE -> Mamprugu Moagduri
    {
      name: "kubori",
      label: "Kubori",
      chps_zone: [
        { name: "kpatorigu_CHPS", label: "Kpatorigu CHPS" },
        { name: "kubugu_CHPS", label: "Kubugu CHPS" },
        { name: "namoo_CHPS", label: "Namoo CHPS" },
        { name: "zanwara_CHPS", label: "Zanwara CHPS" },
      ],
    },
    {
      name: "kunkwa",
      label: "kunkwa",
      chps_zone: [{ name: "katigre_CHPS", label: "Katigre CHPS" }],
    },
    {
      name: "yagaba",
      label: "Yagaba",
      chps_zone: [
        { name: "gbima_CHPS", label: "Gbima CHPS" },
        { name: "loagri_CHPS", label: "Loagri CHPS" },
        { name: "soo_CHPS", label: "Soo CHPS" },
      ],
    },
    {
      name: "yikpabongo",
      label: "Yikpabongo",
      chps_zone: [
        { name: "nangrumah_CHPS", label: "Nangrumah CHPS" },
        { name: "tantala_CHPS", label: "Tantala CHPS" },
        { name: "yikpabongo_CHPS", label: "Yikpabongo CHPS" },
      ],
    },
    //NE -> East Mamprusi
    {
      name: "GAMBAGA",
      label: "Gambaga",
      chps_zone: [
        { name: "GBANGU_CHPS", label: "Gbangu CHPS" },
        { name: "BONGBINI_CHPS", label: "Bongbini CHPS" },
        { name: "NANORI-TINSUNGU_CHPS", label: "Nanori-Tinsungu CHPS" },
        { name: "DAGBIRIBOARI_CHPS", label: "Dagbiriboari CHPS" },
        { name: "TAMBOKU_CHPS", label: "Tamboku CHPS" },
        { name: "ZAARI_CHPS", label: "Zaari CHPS" },
        { name: "LA-ATARI_CHPS", label: "La-Atari CHPS" },
        { name: "NAKOSUGU_CHPS", label: "Nakosugu CHPS" },
        { name: "SIBIEFONG_CHPS", label: "Sibiefong CHPS" },
        { name: "GAMBARAN_CHPS", label: "Gambaran CHPS" },
        { name: "LIMANFONG_CHPS", label: "Limanfong CHPS" },
      ],
    },
    {
      name: "GBINTIRI",
      label: "Gbintiri",
      chps_zone: [
        { name: "NAGBAI_CHPS", label: "Nagbai CHPS" },
        { name: "JAGOO_CHPS", label: "Jagoo CHPS" },
        { name: "DEBONI_CHPS", label: "Deboni CHPS" },
        { name: "NAWUNA_CHPS", label: "Nawuna CHPS" },
        { name: "KUFORI_CHPS", label: "Kufori CHPS" },
      ],
    },
    {
      name: "LANGBINSI",
      label: "Langbinsi",
      chps_zone: [
        { name: "BOWKU_CHPS", label: "Bowku CHPS" },
        { name: "BUZULUNGU_CHPS", label: "Buzulungu CHPS" },
        { name: "BUMBOAZIO_CHPS", label: "Bumboazio CHPS" },
        { name: "NAMANGU_CHPS", label: "Namangu CHPS" },
        { name: "SAMINI_CHPS", label: "Samini CHPS" },
        { name: "TANGBINI_CHPS", label: "Tangbini CHPS" },
        { name: "WUNDUA_CHPS", label: "Wundua CHPS" },
        { name: "LANGBINSI_CHPS", label: "Langbinsi CHPS" },
      ],
    },
    {
      name: "NALERIGU",
      label: "Nalerigu",
      chps_zone: [
        { name: "NASS_CHPS_ZA'ARI_FONG_D", label: "Nass CHPS/Za'ari Fong/D" },
        { name: "NAYIRIFONG_CHPS", label: "Nayirifong CHPS" },
        { name: "GBANDABILA_CHPS", label: "Gbandabila CHPS" },
        { name: "GBANDAA_CHPS", label: "Gbandaa CHPS" },
        { name: "JABLAJO_CHPS", label: "Jablajo CHPS" },
        { name: "KULGONA_CHPS", label: "Kulgona CHPS" },
        { name: "YANKAZIA_CHPS", label: "Yankazia CHPS" },
        { name: "ZANDUA_CHPS", label: "Zandua CHPS" },
        { name: "LUMU_CHPS", label: "Lumu CHPS" },
        { name: "TUNI_CHPS", label: "Tuni CHPS" },
        { name: "JAWANI_CHPS", label: "Jawani CHPS" },
        { name: "KOLINVAI_CHPS", label: "Kolinvai CHPS" },
      ],
    },
    {
      name: "jawani",
      label: "JAWANI",
      chps_zone: [{ name: "jawani_chps", label: "Jawani CHPS" }],
    },
    {
      name: "Kolinvai",
      label: "KOLINVAI",
      chps_zone: [{ name: "kolinvai_chps", label: "Kolinvai CHPS" }],
    },
    {
      name: "SAKOGU",
      label: "Sakogu",
      chps_zone: [
        { name: "ZARANTINGA_CHPS", label: "Zarantinga CHPS" },
        { name: "DABARI_CHPS", label: "Dabari CHPS" },
        { name: "DINDANI_CHPS", label: "Dindani CHPS" },
        { name: "GADANTINGA_CHPS", label: "Gadantinga CHPS" },
        { name: "JERIGITINGA_CHPS", label: "Jerigitinga CHPS" },
        { name: "NAKPANBON_CHPS", label: "Nakpanbon CHPS" },
        { name: "SOANSOBIGI_CHPS", label: "Soansobigi CHPS" },
        { name: "SUMNIBOMA_CHPS", label: "Sumniboma CHPS" },
        { name: "ZAMBULUGU_CHPS", label: "Zambulugu CHPS" },
        { name: "BOGNI_CHPS", label: "Bogni CHPS" },
        { name: "NAMEBOKU_CHPS", label: "Nameboku CHPS" },
      ],
    },
    //UE -> Bawku Municipal
    {
      name: "Baribari Bador",
      label: "Baribari Bador",
      chps_zone: [
        { name: "Bador CHPS", label: "Bador CHPS" },
        { name: "Baribari CHPS", label: "Baribari CHPS" },
        { name: "Buabula CHPS", label: "Buabula CHPS" },
      ],
    },
    {
      name: "Kuka East",
      label: "Kuka East",
      chps_zone: [
        { name: "Kuka CHPS", label: "Kuka CHPS" },
        { name: "Kutamya CHPS", label: "Kutamya CHPS" },
        { name: "Megogo CHPS", label: "Megogo CHPS" },
      ],
    },
    {
      name: "Kuka West",
      label: "Kuka West",
      chps_zone: [
        { name: "Ariziem CHPS", label: "Ariziem CHPS" },
        { name: "Asikiri CHPS", label: "Asikiri CHPS" },
        { name: "Gotisalga CHPS", label: "Gotisalga CHPS" },
        { name: "Kikashegu CHPS", label: "Kikashegu CHPS" },
        { name: "Nadbooda CHPS", label: "Nadbooda CHPS" },
        { name: "Zabugu natinga CHPS", label: "Zabugu natinga CHPS" },
      ],
    },
    {
      name: "Mognori",
      label: "Mognori",
      chps_zone: [
        { name: "Bugzunde CHPS", label: "Bugzunde CHPS" },
        { name: "Gentiga CHPS", label: "Gentiga CHPS" },
        { name: "Gumakutari CHPS", label: "Gumakutari CHPS" },
        { name: "Gumbo CHPS", label: "Gumbo CHPS" },
        { name: "Tampizua CHPS", label: "Tampizua CHPS" },
      ],
    },
    {
      name: "North Natinga",
      label: "North Natinga",
      chps_zone: [
        { name: "Natinga CHPS", label: "Natinga CHPS" },
        { name: "Patelmi Silminaba CHPS", label: "Patelmi Silminaba CHPS" },
        { name: "Possum CHPS", label: "Possum CHPS" },
        { name: "Sabongari CHPS", label: "Sabongari CHPS" },
        { name: "Seinatinga CHPS", label: "Seinatinga CHPS" },
      ],
    },
    {
      name: "South Natinga",
      label: "South Natinga",
      chps_zone: [
        { name: "Kpalore CHPS", label: "Kpalore CHPS" },
        { name: "Mazema/Avengo CHPS", label: "Mazema/Avengo CHPS" },
        { name: "Missiga CHPS", label: "Missiga CHPS" },
        { name: "Sabon Zongo CHPS", label: "Sabon Zongo CHPS" },
      ],
    },
    {
      name: "urban_west",
      label: "Urban West",
      chps_zone: [
        { name: "daduri_CHPS", label: "Daduri CHPS" },
        { name: "gingande_CHPS", label: "Gingande CHPS" },
        { name: "hausa_zongo_CHPS", label: "Hausa Zongo CHPS" },
        { name: "kpaliwega_CHPS", label: "Kpaliwega CHPS" },
        { name: "tensungu_CHPS", label: "Tensungu CHPS" },
        { name: "wiidi_CHPS", label: "Wiidi CHPS" },
      ],
    },
    //UR -> Tempane
    {
      name: "Basyonde",
      label: "BASYONDE",
      chps_zone: [
        { name: "Akara_CHPS", label: "Akara CHPS" },
        { name: "Akarateshie_CHPS", label: "Akarateshie CHPS" },
        { name: "Kpalsako_CHPS", label: "Kpalsako CHPS" },
        { name: "Subzunde_CHPS", label: "Subzunde CHPS" },
        { name: "Nagani_CHPS", label: "Nagani CHPS" },
        { name: "Tarivago_CHPS", label: "Tarivago CHPS" },
        { name: "Kongo", label: "Kongo" },
        { name: "Yeogo_CHPS", label: "Yeogo CHPS" },
      ],
    },
    {
      name: "Bugri",
      label: "BUGRI",
      chps_zone: [
        { name: "Abaripusiga_CHPS", label: "Abaripusiga CHPS" },
        { name: "Bugpiigu_CHPS", label: "Bugpiigu CHPS" },
        { name: "Bulpielsi_CHPS", label: "Bulpielsi CHPS" },
        { name: "Zamballa_1_CHPS", label: "Zamballa 1 CHPS" },
        { name: "Zamballa_2_CHPS", label: "Zamballa 2 CHPS" },
      ],
    },
    {
      name: "Gagbiri",
      label: "GAGBIRI",
      chps_zone: [
        { name: "Kugashiegu_CHPS", label: "Kugashiegu CHPS" },
        { name: "Tariganga_CHPS", label: "Tariganga CHPS" },
        { name: "Gagbiri_CHPS", label: "Gagbiri CHPS" },
        { name: "Kugzua_CHPS", label: "Kugzua CHPS" },
      ],
    },
    {
      name: "Kpikpira",
      label: "KPIKPIRA",
      chps_zone: [
        { name: "Konkomada_CHPS", label: "Konkomada CHPS" },
        { name: "Kpikpira_CHPS", label: "Kpikpira - CHPS" },
        { name: "Nambina_CHPS", label: "Nambina CHPS" },
        { name: "Kpinkpanyong_CHPS", label: "Kpinkpanyong CHPS" },
        { name: "Ninsum_CHPS", label: "Ninsum CHPS" },
        { name: "Sumaduri-Tubong_CHPS", label: "Sumaduri-Tubong CHPS" },
        { name: "Tambalug_CHPS", label: "Tambalug CHPS" },
      ],
    },
    {
      name: "Tempane",
      label: "TEM",
      chps_zone: [
        { name: "Jelakolgo_CHPS", label: "Jelakolgo CHPS" },
        { name: "Busnatenga_CHPS", label: "Busnatenga CHPS" },
        { name: "Tempane_CHPS", label: "Tempane CHPS" },
        { name: "Duskoum_CHPS", label: "Duskoum CHPS" },
        { name: "Tidana_CHPS", label: "Tidana CHPS" },
        { name: "Barboka_CHPS", label: "Barboka CHPS" },
        { name: "Yabrago_CHPS", label: "Yabrago CHPS" },
      ],
    },
    {
      name: "Woriyanga",
      label: "WOR",
      chps_zone: [
        { name: "Bimpella_CHPS", label: "Bimpella CHPS" },
        { name: "Duadenyidiga_CHPS", label: "Duadenyidiga CHPS" },
        { name: "Goum_CHPS", label: "Goum CHPS" },
        { name: "Nadigri_CHPS", label: "Nadigri CHPS" },
        { name: "Tiduriga_CHPS", label: "Tiduriga CHPS" },
        { name: "Woriyanga_Central", label: "Woriyanga Central" },
      ],
    },
    //UE -> Bawku West
    {
      name: "binaba",
      label: "Binaba",
      chps_zone: [
        { name: "azuwera_CHPS", label: "Azuwera CHPS" },
        { name: "gore_CHPS", label: "Gore CHPS" },
        { name: "gumbare_CHPS", label: "Gumbare CHPS" },
        { name: "kopella_CHPS", label: "Kopella CHPS" },
        { name: "peri_kusanaba_CHPS", label: "Peri-Kusanaba CHPS" },
        { name: "zeego_gabulinga_CHPS", label: "Zeego/Gabulinga CHPS" },
      ],
    },
    {
      name: "boya_gbantongo",
      label: "Boya/Gbantongo",
      chps_zone: [
        { name: "boya_CHPS", label: "Boya CHPS" },
        { name: "azoongo_CHPS", label: "Azoongo CHPS" },
        { name: "kamega_CHPS", label: "Kamega CHPS" },
        { name: "kpalsako_CHPS", label: "Kpalsako CHPS" },
        { name: "kpantarigo_CHPS", label: "Kpantarigo CHPS" },
      ],
    },
    {
      name: "sapelliga_googo",
      label: "Sapelliga/Googo",
      chps_zone: [
        { name: "agatusi_CHPS", label: "Agatusi CHPS" },
        { name: "galaka_CHPS", label: "Galaka CHPS" },
        { name: "kare_CHPS", label: "Kare CHPS" },
        { name: "komaka_CHPS", label: "Komaka CHPS" },
        { name: "salpiiga_CHPS", label: "Salpiiga CHPS" },
      ],
    },
    {
      name: "tanga_timonde",
      label: "Tanga/Timonde",
      chps_zone: [
        { name: "biringu_CHPS", label: "Biringu CHPS" },
        { name: "gozeisi_CHPS", label: "Gozeisi CHPS" },
        { name: "tanga_CHPS", label: "Tanga CHPS" },
        { name: "tonde_CHPS", label: "Tonde CHPS" },
      ],
    },
    {
      name: "tilli_widnaba",
      label: "Tilli/Widnaba",
      chps_zone: [
        { name: "azupupuuga_CHPS", label: "Azupupuuga CHPS" },
        { name: "tarikom_CHPS", label: "Tarikom CHPS" },
        { name: "weari_CHPS", label: "Weari CHPS" },
      ],
    },
    {
      name: "zebilla_north",
      label: "Zebilla North",
      chps_zone: [
        { name: "kansoongu_CHPS", label: "Kansoongu CHPS" },
        { name: "kobougo_CHPS", label: "Kobougo CHPS" },
        { name: "soogo_CHPS", label: "Soogo CHPS" },
        { name: "teshie_CHPS", label: "Teshie CHPS" },
      ],
    },
    {
      name: "zebilla_south",
      label: "Zebilla South",
      chps_zone: [
        { name: "kuboko_CHPS", label: "Kuboko CHPS" },
        { name: "sakoam_CHPS", label: "Sakoam CHPS" },
        { name: "kobore_CHPS", label: "Kobore CHPS" },
        { name: "lamboya_CHPS", label: "Lamboya CHPS" },
        { name: "saka_CHPS", label: "Saka CHPS" },
        { name: "yarigu_CHPS", label: "Yarigu CHPS" },
        { name: "yikurugu_CHPS", label: "Yikurugu CHPS" },
      ],
    },
    {
      name: "zongoire",
      label: "Zongoire",
      chps_zone: [
        { name: "apodapogo_CHPS", label: "Apodapogo CHPS" },
        { name: "dagunba_CHPS", label: "Dagunba CHPS" },
        { name: "zongoire_CHPS", label: "Zongoire CHPS" },
      ],
    },
    //UE -> Garu
    {
      name: "denugu",
      label: "Denugu",
      chps_zone: [
        { name: "Denugu_CHPS", label: "Denugu CHPS" },
        { name: "Dusbuliga_CHPS", label: "Dusbuliga CHPS" },
        { name: "Duuri_CHPS", label: "Duuri CHPS" },
        { name: "Siisi_CHPS", label: "Siisi CHPS" },
        { name: "Wakuan_CHPS", label: "Wakuan CHPS" },
      ],
    },
    {
      name: "garu",
      label: "Garu",
      chps_zone: [
        { name: "Tanzug_CHPS", label: "Tanzug CHPS" },
        { name: "Zongo_CHPS", label: "Zongo CHPS" },
        { name: "Bilatega_CHPS", label: "Bilatega CHPS" },
        { name: "Werichingo_CHPS", label: "Werichingo CHPS" },
      ],
    },
    {
      name: "kpatia",
      label: "Kpatia",
      chps_zone: [
        { name: "Niisbuliga_CHPS", label: "Niisbuliga CHPS" },
        { name: "Dabilla_CHPS", label: "Dabilla CHPS" },
        { name: "Kpatia_CHPS", label: "Kpatia CHPS" },
        { name: "Meliga_CHPS", label: "Meliga CHPS" },
      ],
    },
    {
      name: "kpatua",
      label: "Kpatua",
      chps_zone: [
        { name: "Gbanterago_CHPS", label: "Gbanterago CHPS" },
        { name: "Kpatua_CHPS", label: "Kpatua CHPS" },
        { name: "Tambalug_CHPS", label: "Tambalug CHPS" },
        { name: "Nomboko_CHPS", label: "Nomboko CHPS" },
      ],
    },
    {
      name: "kugri",
      label: "Kugri",
      chps_zone: [
        { name: "Aloko_CHPS", label: "Aloko CHPS" },
        { name: "Kugri_CHPS", label: "Kugri CHPS" },
        { name: "Avosum_CHPS", label: "Avosum CHPS" },
        { name: "Pialugu_CHPS", label: "Pialugu CHPS" },
      ],
    },
    {
      name: "songo",
      label: "Songo",
      chps_zone: [
        { name: "Senebaga_CHPS", label: "Senebaga CHPS" },
        { name: "Songuri_CHPS", label: "Songuri CHPS" },
        { name: "Wadugu_CHPS", label: "Wadugu CHPS" },
      ],
    },
    {
      name: "worikambo",
      label: "Worikambo",
      chps_zone: [
        { name: "Farfar_CHPS", label: "Farfar CHPS" },
        { name: "Kolmasug_CHPS", label: "Kolmasug CHPS" },
        { name: "Guuni_CHPS", label: "Guuni CHPS" },
        { name: "Suamvuus_CHPS", label: "Suamvuus CHPS" },
        { name: "Zaar_zua_CHPS", label: "Zaar-zua CHPS" },
        { name: "Yizidug_CHPS", label: "Yizidug CHPS" },
        { name: "Bantafarugu_CHPS", label: "Bantafarugu CHPS" },
      ],
    },
    //UW -> Nadowli-Kaleo
    {
      name: "charikpong",
      label: "Charikpong",
      chps_zone: [
        { name: "kuuri_bure_CHPS", label: "Kuuri/Bure CHPS" },
        { name: "sampina_CHPS", label: "Sampina CHPS" },
      ],
    },
    {
      name: "dapuori",
      label: "Dapuori",
      chps_zone: [
        { name: "dapopare_CHPS", label: "Dapopare CHPS" },
        { name: "dapuoh_CHPS", label: "Dapuoh CHPS" },
        { name: "kpazie_CHPS", label: "Kpazie CHPS" },
      ],
    },
    {
      name: "jang",
      label: "Jang",
      chps_zone: [
        { name: "chaang_CHPS", label: "Chaang CHPS" },
        { name: "janguasi_CHPS", label: "Janguasi CHPS" },
        { name: "kanyini_CHPS", label: "Kanyini CHPS" },
        { name: "korinyiri_CHPS", label: "Korinyiri CHPS" },
        { name: "kpagdinga_CHPS", label: "Kpagdinga CHPS" },
        { name: "naro_CHPS", label: "Naro CHPS" },
        { name: "tibani_zambogu_CHPS", label: "Tibani Zambogu CHPS" },
      ],
    },
    {
      name: "kaleo",
      label: "Kaleo",
      chps_zone: [
        { name: "gbankor_CHPS", label: "Gbankor CHPS" },
        { name: "kaaha_ombo_CHPS", label: "Kaaha Ombo CHPS" },
        { name: "loho_CHPS", label: "Loho (Old and New) CHPS" },
        { name: "nyembale_CHPS", label: "Nyembale CHPS" },
        { name: "samatigu_CHPS", label: "Samatigu CHPS" },
        { name: "sankana_CHPS", label: "Sankana CHPS" },
        { name: "chaangu_CHPS", label: "Chaangu CHPS" },
        { name: "buomuni_CHPS", label: "Buomuni CHPS" },
        { name: "bonmuni_bondouri_CHPS", label: "Bonmuni/Bondouri CHPS" },
      ],
    },
    {
      name: "nadowli",
      label: "Nadowli",
      chps_zone: [
        { name: "nawuli_konkonpare_CHPS", label: "Nawuli/Konkonpare CHPS" },
        { name: "cheri-sombo_CHPS", label: "Cheri-Sombo CHPS" },
        { name: "goli_CHPS", label: "Goli CHPS" },
        { name: "mwaawaare_baamaare_CHPS", label: "Mwaawaare Baamaare CHPS" },
        { name: "tangasie_CHPS", label: "Tangasie CHPS" },
        { name: "voggoni_goriyiri_CHPS", label: "Voggoni/Goriyiri CHPS" },
        { name: "bigu_kankanzie_CHPS", label: "Bigu/Kankanzie CHPS" },
      ],
    },
    {
      name: "nanvilli",
      label: "Nanvilli",
      chps_zone: [
        { name: "kulpieni_CHPS", label: "Kulpieni CHPS" },
        { name: "meguo_mantaari_CHPS", label: "Meguo Mantaari CHPS" },
      ],
    },
    {
      name: "sombo",
      label: "Sombo",
      chps_zone: [
        { name: "duong_CHPS", label: "Duong CHPS" },
        { name: "papu_CHPS", label: "Papu CHPS" },
        { name: "piree_kangua_CHPS", label: "Piree Kangua CHPS" },
      ],
    },
    {
      name: "takpo",
      label: "Takpo",
      chps_zone: [
        { name: "gyilli_CHPS", label: "Gyilli CHPS" },
        { name: "nator_CHPS", label: "Nator CHPS" },
        { name: "niree_penetobo_CHPS", label: "Niree Penetobo CHPS" },
      ],
    },
    //UW -> Sissala East
    {
      name: "KULFUO",
      label: "KULFUO",
      chps_zone: [
        { name: "Mwanduonu_CHPS", label: "Mwanduonu CHPS" },
        { name: "Kuroboi_CHPS", label: "Kuroboi CHPS" },
        { name: "Tarsaw_CHPS", label: "Tarsaw CHPS" },
        { name: "Challu_Upper_CHPS", label: "Challu Upper CHPS" },
        { name: "Challu_CHPS", label: "Challu CHPS" },
      ],
    },
    {
      name: "KUNCHOGU",
      label: "KUNCHOGU",
      chps_zone: [
        { name: "Banu_CHPS", label: "Banu CHPS" },
        { name: "Pina_CHPS", label: "Pina CHPS" },
        { name: "Wuru_CHPS", label: "Wuru CHPS" },
        { name: "kunchogu_Town_CHPS", label: "Kunchogu Town CHPS" },
        { name: "Bassisan_CHPS", label: "Bassisan CHPS" },
        { name: "Kwapun_CHPS", label: "Kwapun CHPS" },
        { name: "Tanla_CHPS", label: "Tanla CHPS" },
      ],
    },
    {
      name: "NABUGUBELLE",
      label: "NABUGUBELLE",
      chps_zone: [
        { name: "Bujan_CHPS", label: "Bujan CHPS" },
        { name: "Dolinbizon_CHPS", label: "Dolinbizon CHPS" },
        { name: "Yigantu_CHPS", label: "Yigantu CHPS" },
        { name: "Nabugubelle_Town_CHPS", label: "Nabugubelle Town CHPS" },
      ],
    },
    {
      name: "NABULO",
      label: "NABULO",
      chps_zone: [
        { name: "Bawiesebelle_CHPS", label: "Bawiesebelle CHPS" },
        { name: "Bawiesebelle_Town_CHPS", label: "Bawiesebelle Town CHPS" },
        { name: "Komo_CHPS", label: "Komo CHPS" },
        { name: "Du-East_CHPS", label: "Du-East CHPS" },
        { name: "Guosi_CHPS", label: "Guosi CHPS" },
        { name: "Santijan_CHPS", label: "Santijan CHPS" },
        { name: "Fachoboi_CHPS", label: "Fachoboi CHPS" },
        { name: "Nabulo-Gbanga_CHPS", label: "Nabulo-Gbanga CHPS" },
        { name: "Gbuna-Kajia_CHPS", label: "Gbuna-Kajia CHPS" },
        { name: "Gbenebisi_CHPS", label: "Gbenebisi CHPS" },
      ],
    },
    {
      name: "Sakai",
      label: "SAKAI",
      chps_zone: [
        { name: "pieng_CHPS", label: "Pieng CHPS" },
        { name: "sentie_CHPS", label: "Sentie CHPS" },
        { name: "bandei_CHPS", label: "Bandei CHPS" },
        { name: "sakalu_CHPS", label: "Sakalu CHPS" },
        { name: "lilixi_CHPS", label: "Lilixi CHPS" },
        { name: "sakai_A_CHPS", label: "Sakai A CHPS" },
        { name: "sakai_B_CHPS", label: "Sakai B CHPS" },
        { name: "nankpawie_CHPS", label: "Nankpawie CHPS" },
      ],
    },
    {
      name: "Tumu",
      label: "TUMU",
      chps_zone: [
        { name: "chinchang_CHPS", label: "Chinchang CHPS" },
        { name: "taffiasi_CHPS", label: "Taffiasi CHPS" },
        { name: "dimajan_CHPS", label: "Dimajan CHPS" },
        { name: "kassana_CHPS", label: "Kassana CHPS" },
        { name: "kong_CHPS", label: "Kong CHPS" },
        { name: "zongo_CHPS", label: "Zongo CHPS" },
        { name: "stadium_residential_CHPS", label: "Stadium Residential CHPS" },
        { name: "nyaminjan_CHPS", label: "Nyaminjan CHPS" },
        { name: "kunsinjan_CHPS", label: "Kunsinjan CHPS" },
        { name: "kansec_CHPS", label: "KANSEC CHPS" },
        { name: "diglafuro_CHPS", label: "Diglafuro CHPS" },
        { name: "dangi_CHPS", label: "Dangi CHPS" },
        { name: "tutco_CHPS", label: "TUTCO CHPS" },
      ],
    },
    {
      name: "Wellembelle",
      label: "WELLEMBELLE",
      chps_zone: [
        { name: "bichemboi_CHPS", label: "Bichemboi CHPS" },
        { name: "bugubelle_CHPS", label: "Bugubelle CHPS" },
        { name: "jijen_CHPS", label: "Jijen CHPS" },
        { name: "wellembelle_upper_CHPS", label: "Wellembelle Upper CHPS" },
        { name: "wellembelle_lower_CHPS", label: "Wellembelle Lower CHPS" },
      ],
    },
    //uw -> Sissala West
    {
      name: "fielmuo",
      label: "Fielmuo",
      chps_zone: [
        { name: "buo_CHPS", label: "Buo CHPS" },
        { name: "chetu_CHPS", label: "Chetu CHPS" },
        { name: "kankanduole_CHPS", label: "Kankanduole CHPS" },
        { name: "konchuri_CHPS", label: "Konchuri CHPS" },
        { name: "liero_CHPS", label: "Liero CHPS" },
        { name: "mwaapal_CHPS", label: "Mwaapal CHPS" },
      ],
    },
    {
      name: "gwollu",
      label: "Gwollu",
      chps_zone: [
        { name: "bullu_CHPS", label: "Bullu CHPS" },
        { name: "fatchu_CHPS", label: "Fatchu CHPS" },
        { name: "gbal_CHPS", label: "Gbal CHPS" },
        { name: "kandia_CHPS", label: "Kandia CHPS" },
        { name: "kunkorgu_CHPS", label: "Kunkorgu CHPS" },
        { name: "kusali_CHPS", label: "Kusali CHPS" },
        { name: "kwalla_CHPS", label: "Kwalla CHPS" },
        { name: "nyemati_CHPS", label: "Nyemati CHPS" },
      ],
    },
    {
      name: "jawia",
      label: "Jawia",
      chps_zone: [
        { name: "bouti_CHPS", label: "Bouti CHPS" },
        { name: "gbarima_CHPS", label: "Gbarima CHPS" },
        { name: "jawia_mobala_CHPS", label: "Jawia Mobala CHPS" },
        { name: "kupulima_CHPS", label: "Kupulima CHPS" },
        { name: "liplime_CHPS", label: "Liplime CHPS" },
        { name: "pulima_CHPS", label: "Pulima CHPS" },
        { name: "silbelle_CHPS", label: "Silbelle CHPS" },
        { name: "sorbelle_CHPS", label: "Sorbelle CHPS" },
      ],
    },
    {
      name: "jeffisi",
      label: "Jeffisi",
      chps_zone: [
        { name: "dasima_CHPS", label: "Dasima CHPS" },
        { name: "duwie_CHPS", label: "Duwie CHPS" },
        { name: "gowi_CHPS", label: "Gowi CHPS" },
        { name: "kuntulo_CHPS", label: "Kuntulo CHPS" },
        { name: "timme_CHPS", label: "Timme CHPS" },
      ],
    },
    {
      name: "zini",
      label: "Zini",
      chps_zone: [
        { name: "du_west_CHPS", label: "Du-West CHPS" },
        { name: "hiel_CHPS", label: "Hiel CHPS" },
        { name: "niator_CHPS", label: "Niator CHPS" },
        { name: "nyentie_CHPS", label: "Nyentie CHPS" },
        { name: "tiwii_CHPS", label: "Tiwii CHPS" },
        { name: "wassai_CHPS", label: "Wassai CHPS" },
      ],
    },
    //UW - DBI
    {
      name: "Bussie",
      label: "Bussie",
      chps_zone: [
        { name: "Bussie_CHPS", label: "Bussie CHPS" },
        { name: "Cheeba_CHPS", label: "Cheeba CHPS" },
        { name: "Daguubaa_CHPS", label: "Daguubaa CHPS" },
        { name: "Kamehegu_CHPS", label: "Kamehegu CHPS" },
      ],
    },
    {
      name: "Daffiama",
      label: "Daffiama",
      chps_zone: [
        { name: "Chakali_Mission_CHPS", label: "Chakali/Mission CHPS" },
        { name: "Dakpaa_CHPS", label: "Dakpaa CHPS" },
        { name: "Dakyie_CHPS", label: "Dakyie CHPS" },
        { name: "Danchalla_Naayikore_CHPS", label: "Danchalla/Naayikore CHPS" },
        { name: "Konzokalla_CHPS", label: "Konzokalla CHPS" },
        { name: "Moyiri_CHPS", label: "Moyiri CHPS" },
        { name: "Owlo_CHPS", label: "Owlo CHPS" },
        { name: "Saapari_CHPS", label: "Saapari CHPS" },
        { name: "Tuori_Wuorgber_CHPS", label: "Tuori/Wuorgber CHPS" },
      ],
    },
    {
      name: "Fian",
      label: "Fian",
      chps_zone: [
        { name: "Fian_CHPS", label: "Fian CHPS" },
        { name: "Pulbaa_CHPS", label: "Pulbaa CHPS" },
      ],
    },
    {
      name: "Issa",
      label: "Issa",
      chps_zone: [
        { name: "Duang_CHPS", label: "Duang CHPS" },
        { name: "Saamanbo_CHPS", label: "Saamanbo CHPS" },
        { name: "Sazie_CHPS", label: "Sazie CHPS" },
        { name: "Sintayiri_CHPS", label: "Sintayiri CHPS" },
        { name: "Tabiesi_CHPS", label: "Tabiesi CHPS" },
        { name: "Wogu_CHPS", label: "Wogu CHPS" },
      ],
    },
    {
      name: "Kojopkere",
      label: "Kojopkere",
      chps_zone: [
        { name: "Banonyiri_CHPS", label: "Banonyiri CHPS" },
        { name: "Challa_CHPS", label: "Challa CHPS" },
        { name: "Jenpensi_CHPS", label: "Jenpensi CHPS" },
        { name: "Jollinyiri_CHPS", label: "Jollinyiri CHPS" },
        { name: "Kojokpere_CHPS", label: "Kojokpere CHPS" },
        { name: "kenkellen_CHPS", label: "Kenkellen CHPS" },
      ],
    },
    //UW -> Wa East
    {
      name: "Baayiri / Naaha",
      label: "Baayiri/Naaha",
      chps_zone: [
        { name: "Goh_CHPS", label: "Goh CHPS" },
        { name: "Gudayiri_CHPS", label: "Gudayiri CHPS" },
        { name: "Kataah_CHPS", label: "Kataah CHPS" },
        { name: "Veisey_CHPS", label: "Veisey CHPS" },
      ],
    },
    {
      name: "Bulenga",
      label: "Bulenga",
      chps_zone: [
        { name: "Chaggu_CHPS", label: "Chaggu CHPS" },
        { name: "Chaggu_Paani_CHPS", label: "Chaggu Paani CHPS" },
        { name: "Danyawkura_CHPS", label: "Danyawkura CHPS" },
        { name: "Ducie_CHPS", label: "Ducie CHPS" },
        { name: "Goripie_CHPS", label: "Goripie CHPS" },
        { name: "Grumbelle_CHPS", label: "Grumbelle CHPS" },
        { name: "Jongfian_CHPS", label: "Jongfian CHPS" },
        { name: "Kende_CHPS", label: "Kende CHPS" },
        { name: "Kpaglaghi_CHPS", label: "Kpaglaghi CHPS" },
        { name: "Kpanamuna_CHPS", label: "Kpanamuna CHPS" },
        { name: "Manwe_CHPS", label: "Manwe CHPS" },
        { name: "Motigu_CHPS", label: "Motigu CHPS" },
        { name: "Nyaayiri_CHPS", label: "Nyaayiri CHPS" },
        { name: "Tuosa_CHPS", label: "Tuosa CHPS" },
      ],
    },
    {
      name: "Funsi",
      label: "Funsi",
      chps_zone: [
        { name: "Buffiama_CHPS", label: "Buffiama CHPS" },
        { name: "Du_West_CHPS", label: "Du West CHPS" },
        { name: "Halimboi_CHPS", label: "Halimboi CHPS" },
        { name: "Tiniabele_CHPS", label: "Tiniabele CHPS" },
      ],
    },
    {
      name: "Holomuni",
      label: "Holomuni",
      chps_zone: [
        { name: "Katua_CHPS", label: "Katua CHPS" },
        { name: "Kpalworgu_CHPS", label: "Kpalworgu CHPS" },
      ],
    },
    {
      name: "Kundungu",
      label: "Kundungu",
      chps_zone: [
        { name: "Bellekpong_CHPS", label: "Bellekpong CHPS" },
        { name: "Chawule_CHPS", label: "Chawule CHPS" },
        { name: "Sombisi_CHPS", label: "Sombisi CHPS" },
      ],
    },
    {
      name: "Loggu",
      label: "Loggu",
      chps_zone: [
        { name: "Bintenge_CHPS", label: "Bintenge CHPS" },
        { name: "Bule_No._1_CHPS", label: "Bule No. 1 CHPS" },
        { name: "Bunaa_CHPS", label: "Bunaa CHPS" },
        { name: "chasia_CHPS", label: "Chasia CHPS" },
        { name: "Jeyiri_CHPS", label: "Jeyiri CHPS" },
        { name: "Kulkpong_CHPS", label: "Kulkpong CHPS" },
        { name: "Sagu_CHPS", label: "Sagu CHPS" },
      ],
    },
    {
      name: "Yaala",
      label: "Yaala",
      chps_zone: [
        { name: "Kulun_CHPS", label: "Kulun CHPS" },
        { name: "Kunyabin_CHPS", label: "Kunyabin CHPS" },
        { name: "Yaala_No.2_CHPS", label: "Yaala No.2 CHPS" },
      ],
    },
  ];

  const regionObj = regions.find((r) => r.name === region);
  const districtObj = districts.find((d) => d.name === district);
  const subdistrictObj = subdistricts.find((sd) => sd.name === subdistrict);

   console.log(region);
  // console.log(district);
  // console.log(subdistrict);
  // console.log(chps_zone);

  useEffect(() => {
    if (
      responseData ||
      responseData.form != "" ||
      responseData.tracker === "" ||
      responseData.response != ""
    ) {
      setIsLoading(true);
      handleReadData();
    } else {
      _serveToast("The QR Code is empty");
      navigation.navigate("Home");
    }
  }, [route.params]);

  const resetState = () => {
    setReadData("");
    setIdentifier("");
    setCreatedBy("");
    setJoined("");
    setCare("");
    setPhone("");
    setGender("");
    setAge("");
    setParity("");
    setWeek("");
    setChannel("");
    setLanguage("");
    setOwnership("");
    setRegion("");
    setDistrict("");
    setSubdistrict("");
    setChps_zone("");
    setHealthArea("");
    setServices("");
    setComments("");
  };

  const handleReadData = async () => {
    try {
      const data = new FormData();

      data.append("form", responseData.form);
      data.append("tracker", responseData.tracker);
      data.append("response", responseData.response);

      const config = {
        method: "post",
        url: API + `/qr_scan_read.php`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data,
      };

      const response = await axios(config);

      if (response) {
        setIsLoading(false);
      }

      if (response.data.identifier !== null) {
        setReadData(response.data);
        setCare(response.data?.servicetype);
        setIdentifier(response.data?.identifier);
        setGender(response.data?.gender);
        setAge(response.data?.age);
        setWeek(response.data?.week);
        setCreatedBy(response.data?.created_by);
        setJoined(response.data?.created_at);
        setLanguage(response.data?.language);
        setChps_zone(response.data?.facility);
      } else {
        resetState();
        setCreatedBy(response.data?.created_by);
      }
    } catch (error) {
      _serveToast("Something went wrong");
      navigation.navigate("Home");
    }
  };

  const handleSubmit = async () => {
    setDisabled(true);
    setIsLoading(true);

    try {
      const bodyFormData = new FormData();

      if (readData["identifier"] && readData["identifier"] > 0) {
        bodyFormData.append("identifier", readData["identifier"]);
        bodyFormData.append("created_by", readData["created_by"]);
        bodyFormData.append("tracker", readData["tracker"]);
        bodyFormData.append("response", readData["response"]);
        bodyFormData.append("form", readData["form"]);
        bodyFormData.append("healthArea", healthArea);
        bodyFormData.append("services", services);
        bodyFormData.append("comment", comments);
      } else {
        bodyFormData.append("tracker", responseData.tracker);
        bodyFormData.append("response", responseData.response);
        bodyFormData.append("form", responseData.form);
        bodyFormData.append("created_by", createdBy);
        bodyFormData.append("care", care);
        bodyFormData.append("phone", phone);
        bodyFormData.append("gender", gender);
        bodyFormData.append("age", age);
        bodyFormData.append("week", week);
        bodyFormData.append("parity", parity);
        bodyFormData.append("channel", channel);
        bodyFormData.append("language", language);
        bodyFormData.append("ownership", ownership);
        bodyFormData.append("region", region);
        bodyFormData.append("district", district);
        bodyFormData.append("subdistrict", subdistrict);
        bodyFormData.append("chps_zone", chps_zone);
      }

      const { status } = await axios({
        method: "post",
        url: API + "/qr_scan_write.php",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (status === 200) {
        resetState();
        setIsLoading(false);
        setDisabled(false);
        _serveToast("Great! form is submitted.");
        navigation.navigate("Home");
      } else {
        _serveToast("Unable to submit the record");
        setIsLoading(false);
        setDisabled(false);
      }
    } catch (err) {
      _serveToast("Something went wrong");
      setIsLoading(false);
      setDisabled(false);
      navigation.navigate("Home");
    }
    setIsLoading(false);
    setDisabled(false);
    resetState();
  };

  const requiredFields = async () => {}

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        <AppText
          center
          style={{
            marginVertical: 5,
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Subscriber Information
        </AppText>
        {isLoading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flex: 1,
              marginVertical: 200,
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
            <Text>Loading Information</Text>
          </View>
        ) : (
          <>
            {identifier ? (
              <>
                <View style={styles.profileCard}>
                  <View style={styles.userInfoSection}>
                    <View>
                      <AppText
                        style={{
                          color: colors.white,
                          fontSize: 30,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                        numberOfLines={1}
                      >
                        {identifier}
                      </AppText>
                    </View>
                    <TouchableHighlight underlayColor={colors.light}>
                      <View style={styles.topcontainer}>
                        <View style={styles.image}>
                          <FontAwesome
                            name="user"
                            size={60}
                            color={colors.white}
                          />
                        </View>
                        <View style={styles.detailsContainer}>
                          <AppText style={styles.subTitle}>
                            <Text>Care:</Text> {care}
                            {"\n"}
                            <Text>Week:</Text> {week}
                            {"\n"}
                            <Text>Language:</Text> {language}
                            {"\n"}
                            <Text>Facility:</Text> {chps_zone}
                            {"\n"}
                            <Text>Joined:</Text> {joined}
                            {"\n"}
                          </AppText>
                        </View>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
                <View style={styles.MainContainer}>
                  <AppText
                    center
                    style={{
                      marginVertical: 15,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Service delivery form
                  </AppText>
                  <View>
                    <Text>Health Area</Text>
                    <Dropdown
                      label="Select health area"
                      data={[
                        {
                          value: "Family Planning",
                        },
                        {
                          value: "Maternal & Child Health",
                        },
                        {
                          value: "Malaria",
                        },
                        {
                          value: "Nutrition",
                        },
                        {
                          value: "WASH",
                        },
                        {
                          value: "Emerging infectious diseases",
                        },
                      ]}
                      value={healthArea}
                      onChangeText={(text) => setHealthArea(text)}
                    />
                  </View>
                  <View>
                    <Text>Services provided</Text>
                    <TextInput
                      autoComplete="off"
                      required
                      multiline
                      editable
                      maxLength={225}
                      value={services}
                      onChangeText={(text) => setServices(text)}
                      style={styles.remarks}
                      placeholder={"Services"}
                    />
                  </View>
                  <View>
                    <Text>Any comments</Text>
                    <TextInput
                      autoComplete="off"
                      required
                      multiline
                      editable
                      numberOfLines={4}
                      maxLength={225}
                      value={comments}
                      onChangeText={(text) => setComments(text)}
                      style={styles._tinput}
                      placeholder={"Any comments..."}
                    />
                  </View>
                  <SubmitButton
                    title="Submit"
                    onPress={handleSubmit}
                    disabled={disabled}
                    loading={isLoading}
                  />
                </View>
              </>
            ) : (
              <>
                <Card>
                  <View style={styles.MainContainer}>
                    <AppText
                      center
                      style={{
                        marginVertical: 15,
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Register new beneficiary
                    </AppText>
                    <View>
                      <>
                        <Text category="label">Type of care</Text>

                        <RadioGroup
                          selectedIndex={care}
                          onChange={(index) => setCare(index)}
                        >
                          <Radio value="ANC">ANC</Radio>
                          <Radio value="PNC">PNC</Radio>
                        </RadioGroup>
                      </>
                    </View>
                    <View>
                      <Text category="label">Mobile number</Text>
                      <Input
                        placeholder="eg: 0545037919"
                        value={phone}
                        onChangeText={(nextValue) => setPhone(nextValue)}
                        autoComplete="off"
                        inputMode="tel"
                        keyboardType="phone-pad"
                        maxLength={10}
                        size="large"
                      />
                    </View>
                    <View>
                      <>
                        <Text category="label">Registrant is (gender)</Text>
                        <RadioGroup
                          selectedIndex={gender}
                          onChange={(index) => setGender(index)}
                        >
                          <Radio color={colors.primary} value="female">
                            Female
                          </Radio>
                          <Radio color={colors.primary} value="male">
                            Male
                          </Radio>
                        </RadioGroup>
                      </>
                    </View>
                    <View>
                      <Text>Age of registrant</Text>
                      <TextInput
                        autoComplete="off"
                        inputMode="numeric"
                        keyboardType="numeric"
                        editable
                        maxLength={2}
                        onChangeText={(text) => setAge(text)}
                        value={age}
                        style={styles.remarks}
                        placeholder={"Age"}
                      />
                    </View>
                    <View>
                      <Text>Weeks of pregnancy/baby</Text>
                      <TextInput
                        autoComplete="off"
                        inputMode="numeric"
                        keyboardType="numeric"
                        editable
                        maxLength={2}
                        onChangeText={(text) => setWeek(text)}
                        value={week}
                        style={styles.remarks}
                        placeholder={"Weeks pregnant/baby"}
                      />
                    </View>
                    <View>
                      <Text>Number of times you have given birth</Text>
                      <TextInput
                        autoComplete="off"
                        inputMode="numeric"
                        keyboardType="numeric"
                        editable
                        maxLength={2}
                        onChangeText={(text) => setParity(text)}
                        value={parity}
                        style={styles.remarks}
                        placeholder={
                          "No. of deliveries with atleast 6 months gestation"
                        }
                      />
                    </View>
                    <View>
                      <Text>
                        How would you like to receive the messages (channel)
                      </Text>
                      <RadioButton.Group
                        onValueChange={(newValue) => setChannel(newValue)}
                        value={channel}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View>
                            <RadioButton color={colors.primary} value="sms" />
                          </View>
                          <View>
                            <Text>SMS</Text>
                          </View>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View>
                            <RadioButton color={colors.primary} value="voice" />
                          </View>
                          <View>
                            <Text>Voice</Text>
                          </View>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View>
                            <RadioButton color={colors.primary} value="both" />
                          </View>
                          <View>
                            <Text>Both</Text>
                          </View>
                        </View>
                      </RadioButton.Group>
                    </View>
                    <View>
                      <Text>What is your preferred language</Text>
                      <RadioButton.Group
                        onValueChange={(newValue) => setLanguage(newValue)}
                        value={language}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View>
                            <RadioButton
                              color={colors.primary}
                              value="dagbani"
                            />
                          </View>
                          <View>
                            <Text>Dagbani</Text>
                          </View>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View>
                            <RadioButton
                              color={colors.primary}
                              value="mampruli"
                            />
                          </View>
                          <View>
                            <Text>Mampruli</Text>
                          </View>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View>
                            <RadioButton color={colors.primary} value="buli" />
                          </View>
                          <View>
                            <Text>Buli</Text>
                          </View>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View>
                            <RadioButton color={colors.primary} value="fula" />
                          </View>
                          <View>
                            <Text>Fula</Text>
                          </View>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View>
                            <RadioButton color={colors.primary} value="twi" />
                          </View>
                          <View>
                            <Text>Twi</Text>
                          </View>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View>
                            <RadioButton color={colors.primary} value="hausa" />
                          </View>
                          <View>
                            <Text>Hausa</Text>
                          </View>
                        </View>
                      </RadioButton.Group>
                    </View>
                    <View>
                      <Text>Phone belongs to</Text>
                      <RadioButton.Group
                        onValueChange={(newValue) => setOwnership(newValue)}
                        value={ownership}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View>
                            <RadioButton color={colors.primary} value="self" />
                          </View>
                          <View>
                            <Text>Self</Text>
                          </View>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View>
                            <RadioButton
                              color={colors.primary}
                              value="partner"
                            />
                          </View>
                          <View>
                            <Text>Partner</Text>
                          </View>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View>
                            <RadioButton
                              color={colors.primary}
                              value="relative"
                            />
                          </View>
                          <View>
                            <Text>Relative/Friend</Text>
                          </View>
                        </View>
                      </RadioButton.Group>
                    </View>
                    <View>
                        <>
                          <Text category="label">Choose Region</Text>
                          {regions.length > 0 ? (
                            <>
                              <View>
                                <Select
                                  style={styles.select}
                                  size="large"
                                  value={regions[selectedIndex.row]}
                                  selectedIndex={selectedIndex}
                                  onSelect={(index: IndexPath) => {
                                    setRegion(regions[index]);
                                    setSelectedIndex(new IndexPath(index));
                                    setError(null);
                                  }}
                                  placeholder="Select a region"
                                >
                                  {regions.map((region) => (
                                    <SelectItem key={region} title={region} />
                                  ))}
                                </Select>
                                {error && (
                                  <Text style={{ color: "red" }}>
                                    Please select a region
                                  </Text>
                                )}
                              </View>
                            </>
                          ) : (
                            <></>
                          )}
                          {/* <Select
                            style={styles.select}
                            size="large"
                            placeholder="Choose a region"
                            selectedIndex={selectedIndex}
                            onSelect={(index) => {
                              setRegion(index);
                              setSelectedIndex(index);
                              setError(null);
                            }}
                          >
                            <SelectItem key="northern" title="Northern" />
                            <SelectItem key="northeast" title="North East" />
                            <SelectItem key="uppereast" title="Upper East" />
                            <SelectItem key="upperwest" title="Upper West" />
                          </Select> */}
                        </>
                    </View>
                    {regionObj ? (
                      <>
                        <View>
                          <Text>
                            {"Choose district (" + regionObj.label + ")"}
                          </Text>
                          <Select
                            style={styles.select}
                            size="large"
                            selectedIndex={selectedIndex}
                            onSelect={(index) => {
                              setDistrict(regionObj.districts[index].name);
                              setSelectedIndex(index);
                              setError(null);
                            }}
                            value={districts ? districts : ""}
                            placeholder="Select a district"
                          >
                            {regionObj.districts.map((district) => (
                              <SelectItem
                                key={district.name}
                                title={district.label}
                              />
                            ))}
                          </Select>
                          {error && (
                            <Text style={{ color: "red" }}>
                              Please select a district
                            </Text>
                          )}
                        </View>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* {regionObj ? (
                    <>
                      <View>
                        <Text>
                          {"Choose district (" + regionObj.label + ")"}
                        </Text>
                        <RadioButton.Group
                          onValueChange={(newValue) => {
                            setDistrict(newValue);
                            setError(null);
                          }}
                          value={district}
                          isRequired
                        >
                          {regionObj.districts.map((district) => (
                            <View
                              key={district.name}
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <View>
                                <RadioButton
                                  color={colors.primary}
                                  value={district.name}
                                />
                              </View>
                              <View>
                                <Text>{district.label}</Text>
                              </View>
                            </View>
                          ))}
                        </RadioButton.Group>
                        {error && (
                          <Text style={{ color: "red" }}>
                            Please select a district
                          </Text>
                        )}
                      </View>
                    </>
                  ) : (
                    <></>
                  )} */}

                    <Layout style={styles.container} level="1">
                      {districtObj ? (
                        <>
                          <View>
                            <Text>
                              {"Choose Subdistrict (" + districtObj.label + ")"}
                            </Text>
                            <Select
                              selectedIndex={selectedIndex}
                              onSelect={(index) => {
                                setSubdistrict(
                                  districtObj.subdistricts[index].name
                                );
                                setSelectedIndex(index);
                                setError(null);
                              }}
                              value={subdistricts ? subdistricts : ""}
                              placeholder="Select a Subdistrict"
                              style={{ marginTop: 10 }}
                            >
                              {districtObj.subdistricts.map((subdistrict) => (
                                <SelectItem
                                  key={subdistrict.name}
                                  title={subdistrict.label}
                                />
                              ))}
                            </Select>
                            {error && (
                              <Text style={{ color: "red" }}>
                                Please select a subdistrict
                              </Text>
                            )}
                          </View>
                        </>
                      ) : (
                        <></>
                      )}
                    </Layout>

                    {/* {districtObj ? (
                    <>
                      <View>
                        <Text>
                          {"Choose subdistrict (" + districtObj.label + ")"}
                        </Text>
                        <RadioButton.Group
                          onValueChange={(newValue) => {
                            setSubdistrict(newValue);
                            setError(null);
                          }}
                          value={subdistrict}
                          isRequired
                        >
                          {districtObj.subdistricts.map((subdistrict) => (
                            <View
                              key={subdistrict.name}
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <View>
                                <RadioButton
                                  color={colors.primary}
                                  value={subdistrict.name}
                                />
                              </View>
                              <View>
                                <Text>{subdistrict.label}</Text>
                              </View>
                            </View>
                          ))}
                        </RadioButton.Group>
                        {error && (
                          <Text style={{ color: "red" }}>
                            Please select a district
                          </Text>
                        )}
                      </View>
                    </>
                  ) : (
                    <></>
                  )} */}

                    {/* {subdistrictObj ? (
                    <>
                      <View>
                        <Text>
                          {"Choose CHPS Zone (" + subdistrictObj.label + ")"}
                        </Text>
                        <RadioButton.Group
                          onValueChange={(newValue) => {
                            setChps_zone(newValue);
                            setError(null);
                          }}
                          value={chps_zone}
                          isRequired
                        >
                          {subdistrictObj.chps_zone.map((chps_zone) => (
                            <View
                              key={chps_zone.name}
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <View>
                                <RadioButton
                                  color={colors.primary}
                                  value={chps_zone.name}
                                />
                              </View>
                              <View>
                                <Text>{chps_zone.label}</Text>
                              </View>
                            </View>
                          ))}
                        </RadioButton.Group>
                        {error && (
                          <Text style={{ color: "red" }}>
                            Please select a CHPS Zone
                          </Text>
                        )}
                      </View>
                    </>
                  ) : (
                    <></>
                  )} */}
                    <Layout style={styles.container} level="1">
                      {subdistrictObj ? (
                        <>
                          <View>
                            <Text>
                              {"Choose CHPS Zone (" +
                                subdistrictObj.label +
                                ")"}
                            </Text>
                            <Select
                              selectedIndex={selectedIndex}
                              onSelect={(index) => {
                                setChps_zone(
                                  subdistrictObj.chps_zone[index].name
                                );
                                setSelectedIndex(index);
                                setError(null);
                              }}
                              value={chps_zone ? chps_zone : ""}
                              placeholder="Select a CHPS Zone"
                              style={{ marginTop: 10 }}
                            >
                              {subdistrictObj.chps_zone.map((chps_zone) => (
                                <SelectItem
                                  key={chps_zone.name}
                                  title={chps_zone.label}
                                />
                              ))}
                            </Select>
                            {error && (
                              <Text style={{ color: "red" }}>
                                Please select a CHPS Zone
                              </Text>
                            )}
                          </View>
                        </>
                      ) : (
                        <></>
                      )}
                    </Layout>

                    <SubmitButton
                      title="Submit"
                      onPress={handleSubmit}
                      disabled={disabled}
                      loading={isLoading}
                    />
                  </View>
                </Card>
              </>
            )}
          </>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ResponseScanner;

const styles = StyleSheet.create({
  select: {
    marginVertical: 2,
    marginTop: 10,
  },
  container: {
    padding: 10,
    paddingBottom: 20,
    marginBottom: 10,
  },
  topcontainer: {
    flexDirection: "row",
    padding: 5,
  },
  MainContainer: {
    flex: 1,
  },
  _tinput: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 1 - 0.6,
    marginVertical: 10,
  },
  userInfoSection: {
    backgroundColor: colors.primary,
    marginVertical: -10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: colors.secoundary,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    color: colors.white,
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: {
    color: colors.white,
    fontSize: 14,
  },
  detailsContainer: {
    marginLeft: 20,
    justifyContent: "center",
    flex: 1,
  },
  profileCard: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 5,
    backgroundColor: colors.primary,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  remarks: {
    backgroundColor: colors.light,
    borderRadius: 10,
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 30,
    textTransform: "uppercase",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
