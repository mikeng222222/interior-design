/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'residential' | 'suite' | 'culinary' | 'commercial';
  categoryLabel: string;
  image: string;
  description: string;
  details: string[];
  year: string;
  location: string;
  materials: string[];
  colorPalette: ColorSwatch[];
}

export interface MaterialOption {
  id: string;
  name: string;
  type: 'wall' | 'floor' | 'fabric' | 'accent';
  hex: string;
  textureDescription: string;
}

export interface ConsultationForm {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  date: string;
  time: string;
}

export interface QuizState {
  step: number;
  spaceType: string;
  vibe: string;
  size: string;
  budgetRange: string;
}
