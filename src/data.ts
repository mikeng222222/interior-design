/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, MaterialOption } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'living-room-sanctuary',
    title: 'Living Room Sanctuary',
    category: 'residential',
    categoryLabel: '01 / RESIDENTIAL',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcQVkdj1xf5WWQAPdkTQEAo-wHSycpFCuC-jPcEQcGs80M5s-7HkeJC-84jdtjXNQTDFZ4gq6MDyIFy0nVf_mZkcYrRrx-XFd13Su945KPXV0SBZoJH-8eBKagt2BYqwyyzL6Km4cUmAvB2DbD7PEmss8Kv4sHcdUCUElBTb1n2bTqBdwC7xjuy1I6HgoYZfNofz044k3FgvRpYrM-ZjMSwTdJ0XmttALjcUuZ6Ge47Dn6HgT8z2RauJr-teA1JXSuXSeBhjLwCRqG',
    description: 'A sun-drenched minimalist living room featuring curved seating and sculptural armchairs, designed to capture morning sunlight.',
    details: [
      'Expansive floor-to-ceiling panoramic windows draped in soft, sheer natural Belgian linen.',
      'Custom curved lounge seating in soft bouclé textile, offset by architectural stone accents.',
      'Grounded by an oversized, custom-woven jute and wool area rug.',
      'Walls finished in subtle, hand-applied Roman clay plaster for soft tactile texture.'
    ],
    year: '2024',
    location: 'London, UK',
    materials: ['Limestone Plaster', 'Belgian Linen', 'Cream Bouclé', 'Honed Travertine'],
    colorPalette: [
      { name: 'Warm Alabaster', hex: '#FCF9F8' },
      { name: 'Soft Sand', hex: '#E6DED6' },
      { name: 'Oatmeal', hex: '#67625B' },
      { name: 'Raw Umber', hex: '#4A4640' }
    ]
  },
  {
    id: 'serene-bedroom',
    title: 'Serene Bedroom Retreat',
    category: 'suite',
    categoryLabel: '02 / PRIVATE SUITE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnScbhry_x1lpbjOyq0_6aUVk-Gm-_8HTRGUeG3mbbGlFrPRoNSZdqII7XwQrXSvIX7jayCNiChlKpdAuxw2HV38dW8Jwh9HGyoJ3ZO_b-yYwj29xvJf63fnxrxbtIrEpbc5D5cAnsag98V9af8LSFjvxCWV4hiCkdU_SkbAQ-4ZCFulsxDjKt0oGcZd9EDEDHP0QnffWFflOWuUfO7a8rfRGWLCjfIMY2MXqYkLbEjXENofTD9LogElsaRJgJJg4DVRlEucSDsJgt',
    description: 'An ethereal bedroom suite focusing on soft plaster-finish walls, organic textures, and peaceful low-profile oak furniture.',
    details: [
      'Low-profile bespoke white oak platform bed frame with integrated floating side tables.',
      'Tactile layered bedding featuring enzyme-washed linen in oatmeal and stone-gray tones.',
      'Abstract custom canvas commission acting as the sole, balancing visual focus of the suite.',
      'Sculptural boucle club armchair placed elegantly beside linen drapes, inviting reading and repose.'
    ],
    year: '2023',
    location: 'Paris, France',
    materials: ['White Oak', 'Enzyme-Washed Linen', 'Bouclé Wool', 'Textured Canvas'],
    colorPalette: [
      { name: 'Linen White', hex: '#F5F5F0' },
      { name: 'Pebble Gray', hex: '#CCC5BE' },
      { name: 'Muted Taupe', hex: '#766E62' },
      { name: 'Deep Moss', hex: '#4C463B' }
    ]
  },
  {
    id: 'monolithic-kitchen',
    title: 'Monolithic Culinary Space',
    category: 'culinary',
    categoryLabel: '03 / CULINARY',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeeca82KLlp2H3F385EwxgDuzEUNHHHYJ-zE3GNB6D35NF6XeziW8y_sQEpnf19DgtdkmuxWwUhCrR8yhAUt-nJKHnqFL1zVdFBCaAWc7XcrxO8XVmHowBt7r3PIn3gWQjUZ81__gGP4wk-qH3OTDLJOGA6lv8_sAVRk7ZqsrWFmVy_PGTzNqz3rJ54K7VS0-OtswcHKxEns3OUJap5eg1KhuJdRreg8eagTTST_CuzRDdG94hhrR8AqQvtMTS5s1WQ6Ln9on0Us1E',
    description: 'A culinary pavilion featuring a massive island carved from Calacatta marble, framed by seamless, handless mist cabinets.',
    details: [
      'Bespoke kitchen island meticulously crafted from a single, bookmatched Calacatta Lincoln slab.',
      'Fully integrated, push-to-open flat-panel cabinetry finished in durable matte mist-gray lacquer.',
      'Solid brass brushed details, plumbing fixtures, and hidden appliance compartments.',
      'Poured seamless microcement floors running out to a private courtyard garden.'
    ],
    year: '2024',
    location: 'Milan, Italy',
    materials: ['Calacatta Marble', 'Matte Lacquer', 'Brushed Brass', 'Microcement'],
    colorPalette: [
      { name: 'Mist', hex: '#E5E2E1' },
      { name: 'Calacatta White', hex: '#FFFFFF' },
      { name: 'Brass Ochre', hex: '#CFC5B6' },
      { name: 'Charcoal', hex: '#1C1B1B' }
    ]
  },
  {
    id: 'the-serene-sanctuary',
    title: 'The Serene Sanctuary',
    category: 'residential',
    categoryLabel: '04 / RESIDENTIAL',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuQIovzYk9YinL8VUfvA5s7swl2WjSpKPlRcnr7nm1zzhh5lRS30siNoxRA_fTX5Qd9hjCE3mR99Y9G8MiXcAFyqBlH1zjCFjDvZ1ohu0ir_BGz9ewSs_sfhgs-RyhZN7lCF6hCxsy8KSYYFqxDNsNmFHqAvPpWKwsNOZ3Ooe250t-mwyjD1G-pXw3pbD_ex4x_LvSmhIrkJdg5IcQMWn_8pu_YuOCLTxlgJ3MJqDIuRH1MmLwqTKLbFyiay6z2wrwtYznwHP8L887',
    description: 'An elegant high-rise penthouse living area overlooking the city silhouette at dusk, combining travertine and warm lights.',
    details: [
      'Symmetric arrangement with a monolithic floating travertine fireplace mantel.',
      'Sinuous curved custom mohair sectional in soft cream, creating an intimate conversation circle.',
      'Polished limestone coffee table showing rich, sedimented geological layers.',
      'Concealed, soft warm indirect cove LED strip lighting emphasizing architectural volume.'
    ],
    year: '2024',
    location: 'New York, NY',
    materials: ['Honed Travertine', 'Mohair Velvet', 'Walnut Wood', 'Polished Limestone'],
    colorPalette: [
      { name: 'Alabaster Tint', hex: '#FCF9F8' },
      { name: 'Warm Travertine', hex: '#ECE1D2' },
      { name: 'Earth Clay', hex: '#766E62' },
      { name: 'Dusk Sky', hex: '#1C1B1B' }
    ]
  }
];

export const WALL_OPTIONS: MaterialOption[] = [
  { id: 'w1', name: 'Roman Clay Plaster', type: 'wall', hex: '#FCF9F8', textureDescription: 'Warm, hand-applied gypsum plaster with delicate trowel marks.' },
  { id: 'w2', name: 'Honed Travertine', type: 'wall', hex: '#ECE1D2', textureDescription: 'Natural pitted stone slab cladding with warm, creamy undertones.' },
  { id: 'w3', name: 'Mist Concrete', type: 'wall', hex: '#E5E2E1', textureDescription: 'Lightly buffed natural microcement for a sophisticated industrial edge.' },
  { id: 'w4', name: 'Soft Charcoal', type: 'wall', hex: '#313030', textureDescription: 'Deep, matte coal-tinted clay that absorbs light and adds high-contrast intimacy.' }
];

export const FLOOR_OPTIONS: MaterialOption[] = [
  { id: 'f1', name: 'Seamless Microcement', type: 'floor', hex: '#F0EDED', textureDescription: 'Smooth, unbroken matte cement finish that flows beautifully.' },
  { id: 'f2', name: 'Light White Oak', type: 'floor', hex: '#E9E1D9', textureDescription: 'Select-grade engineered wide planks with a soft, chalky matte oil sealer.' },
  { id: 'f3', name: 'Honed Belgian Limestone', type: 'floor', hex: '#CCC5BE', textureDescription: 'Brushed natural blue-gray stone tiles with organic fossil patterns.' }
];

export const FABRIC_OPTIONS: MaterialOption[] = [
  { id: 'fb1', name: 'Cream Bouclé Wool', type: 'fabric', hex: '#FFFFFF', textureDescription: 'High-texture, loopy sheep wool with incredibly warm, tactile density.' },
  { id: 'fb2', name: 'Belgian Pure Linen', type: 'fabric', hex: '#F6F3F2', textureDescription: 'Enzyme-softened medium-weight raw flax weave that drapes elegantly.' },
  { id: 'fb3', name: 'Warm Mohair Velvet', type: 'fabric', hex: '#CFC5B6', textureDescription: 'Lustrous, deep-pile organic angora wool with a rich, soft sheen.' }
];

export const ACCENT_OPTIONS: MaterialOption[] = [
  { id: 'a1', name: 'Brushed Solid Brass', type: 'accent', hex: '#DEC196', textureDescription: 'Unlacquered golden metal that will develop a slow, rich organic patina.' },
  { id: 'a2', name: 'Oxidized Gunmetal', type: 'accent', hex: '#4A4640', textureDescription: 'Hand-rubbed darkened iron with a dry, charcoal metallic sheen.' },
  { id: 'a3', name: 'Carrara Marble', type: 'accent', hex: '#eae7e7', textureDescription: 'Pristine white marble with dynamic, smoke-gray crystalline veining.' }
];
