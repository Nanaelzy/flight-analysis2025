import { Chart } from 'chart.js/auto';
Chart.defaults.color = '#9aa0d0';
Chart.defaults.borderColor = '#ffffff14';
Chart.defaults.font.family = 'Figtree,system-ui,sans-serif';
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.plugins.legend.labels.boxWidth = 12;
Object.assign(Chart.defaults.plugins.tooltip, { backgroundColor: '#0b0b24f2', borderColor: '#a78bfa66', borderWidth: 1, padding: 11, cornerRadius: 12, titleFont: { weight: '700' } });
