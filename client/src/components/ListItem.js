import React from "react";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";


export default function ListItem(props) {
  return (
    <List.Item>
      <List.Icon name='users' />
      <List.Content>{`${props.firstname}`}</List.Content>
    </List.Item>
  );
}