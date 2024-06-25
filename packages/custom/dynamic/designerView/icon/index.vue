<script setup lang="ts">


import Text from './iconPark/Text.vue'
import HandDrag from './iconPark/HandDrag.vue'
import ExpandTextInput from './iconPark/ExpandTextInput.vue'
import ListNumbers from './iconPark/ListNumbers.vue'
import SwitchOne from './iconPark/SwitchOne.vue'
import ListCheckbox from './iconPark/ListCheckbox.vue'
import FullScreen from './iconPark/FullScreen.vue'
import RadioTwo from './iconPark/RadioTwo.vue'
import AddPicture from './iconPark/AddPicture.vue'
import PictureAlbum from './iconPark/PictureAlbum.vue'
import Upload from './iconPark/Upload.vue'
import Share from './iconPark/Share.vue'
import CalendarDot from './iconPark/CalendarDot.vue'
import Time from './iconPark/Time.vue'
import TreeList from './iconPark/TreeList.vue'
import Planet from './iconPark/Planet.vue'
import Word from './iconPark/Word.vue'
import TextStyle from './iconPark/TextStyle.vue'
import LayoutTwo from './iconPark/LayoutTwo.vue'
import Margin from './iconPark/Margin.vue'
import Label from './iconPark/Label.vue'
import Bookmark from './iconPark/Bookmark.vue'
import FormOne from './iconPark/FormOne.vue'
import MenuUnfold from './iconPark/MenuUnfold.vue'
import HamburgerButton from './iconPark/HamburgerButton.vue'
import BankCard from './iconPark/BankCard.vue'
import Code from './iconPark/Code.vue'
import DividingLine from './iconPark/DividingLine.vue'
import Tips from './iconPark/Tips.vue'
import TopicDiscussion from './iconPark/TopicDiscussion.vue'
import Back from './iconPark/Back.vue'
import Next from './iconPark/Next.vue'

const props = defineProps<{ name: string }>();
const components = {
    Text, HandDrag, ExpandTextInput, ListNumbers, SwitchOne, ListCheckbox, FullScreen, RadioTwo, AddPicture, PictureAlbum, Upload, Share, CalendarDot, 
    Time, TreeList, Planet, Word, TextStyle,
    LayoutTwo, Margin, Label, Bookmark, FormOne, MenuUnfold, HamburgerButton, BankCard, Code, DividingLine, Tips, TopicDiscussion,Back,Next
};


function kebabToPascal(str: string) {
    if(!str){
return '';
    }
    return str.replace(/(^|-)(\w)/g, (match, p1, p2) => p2.toUpperCase());
}

function getComponent(name: string) {
    const pascalCaseName = kebabToPascal(name);
    return components[pascalCaseName] || Text; // 默认返回 Text 组件，如果 name 未匹配
}
</script>

<template>
   <component :is="getComponent(name)" ></component>
</template>