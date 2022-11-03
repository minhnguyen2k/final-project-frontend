import { Theme } from '@mui/material';
import { merge } from 'lodash';
import { Button } from './Button';
import { CssBaseline } from './CssBaseline';
import { AppBar } from './AppBar';
import { Toolbar } from './Toolbar';
import { Paper } from './Paper';
import { TextField } from './TextField';

export function componentsOverride(theme: Theme) {
  return merge(CssBaseline(), Button(theme), AppBar(theme), Toolbar(theme), Paper(theme), TextField(theme));
}
