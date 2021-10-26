import React from 'react'
import PropTypes from 'prop-types'

const Select = ({ color, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={size}
      height={size}
      viewBox="0 0 172 172">
      <g transform="">
        <g
          fill="none"
          fillRule="nonzero"
          stroke="none"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeDasharray=""
          strokeDashoffset="0"
          fontFamily="none"
          fontWeight="none"
          fontSize="none"
          textAnchor="none">
          <path d="M0,172v-172h172v172z" fill="none"></path>
          <g fill={color}>
            <path d="M2.58251,0.03014c-1.42034,0 -2.57174,1.15141 -2.57174,2.57174v44.85984c0,1.42034 1.15141,2.57174 2.57174,2.57174c1.4207,0 2.57174,-1.15141 2.57174,-2.57174v-42.28809h31.26634c1.42034,0 2.57174,-1.15141 2.57174,-2.57174c0,-1.42034 -1.15141,-2.57174 -2.57174,-2.57174zM47.44234,0.03014c-1.62304,0.00029 -2.93862,1.3161 -2.93862,2.93913c0,1.62304 1.31558,2.93885 2.93862,2.93913c1.62304,-0.00029 2.93862,-1.3161 2.93862,-2.93913c0,-1.62304 -1.31558,-2.93885 -2.93862,-2.93913zM124.5078,0.03014c-1.42034,0 -2.57174,1.15141 -2.57174,2.57174c0,1.42034 1.15141,2.57174 2.57174,2.57174h42.28809v42.28809c0,1.42034 1.15141,2.57174 2.57174,2.57174c1.42034,0 2.57174,-1.15141 2.57174,-2.57174v-44.85984c0,-1.42034 -1.15141,-2.57174 -2.57174,-2.57174zM24.61238,22.07365c-1.42034,0 -2.57174,1.15141 -2.57174,2.57174v22.81633c0,1.42034 1.15141,2.57174 2.57174,2.57174c1.41997,0 2.57102,-1.15176 2.57102,-2.57246v-20.24386h20.24243c1.42034,0 2.57103,-1.15141 2.57103,-2.57174c0,-1.42034 -1.15069,-2.57174 -2.57103,-2.57174zM124.49273,22.07365c-1.42034,0 -2.57174,1.15141 -2.57174,2.57174c0,1.42034 1.15141,2.57174 2.57174,2.57174h20.24171v20.24458c0,1.42034 1.15069,2.57174 2.57103,2.57174c1.42034,0 2.57174,-1.15176 2.57174,-2.57246v-22.81561c0,-1.42034 -1.15141,-2.57174 -2.57174,-2.57174zM115.18452,38.23889c-5.68723,0 -10.31496,4.63608 -10.31496,10.33433v47.79681l-1.28587,-2.29835c-4.21068,-7.52859 -13.6488,-10.62239 -21.48453,-7.04215c-3.07287,1.32959 -4.45024,5.31157 -2.86164,8.25842c4.42119,8.41952 8.31254,16.28427 11.62164,25.93198c3.84696,10.93542 10.58933,17.54779 15.56823,21.1688c2.6195,1.90566 4.18339,4.97648 4.18339,8.21393v18.79439c-0.02719,1.38176 1.19,2.59893 2.57103,2.57174h50.79551c1.42034,0 2.57174,-1.15141 2.57174,-2.57174v-19.40073c-0.27297,-8.75017 6.00078,-16.0232 5.41185,-24.8542v-41.80733c0,-5.69824 -4.627,-10.33433 -10.31496,-10.33433c-2.11471,0 -4.08364,0.64123 -5.72184,1.73937c-1.38654,-4.0718 -5.24119,-7.00771 -9.76745,-7.00771c-2.03756,0 -3.93884,0.59484 -5.5403,1.62097c-1.20431,-4.36755 -5.20567,-7.58391 -9.94613,-7.58391c-1.88252,0 -3.6494,0.50879 -5.17003,1.39494v-14.59091c0,-5.69825 -4.62772,-10.33433 -10.31568,-10.33433zM115.18452,43.38237c2.8517,0 5.17147,2.32886 5.17147,5.19085v43.70815c0,1.42034 1.15141,2.57174 2.57174,2.57174c1.42034,0 2.57103,-1.15141 2.57103,-2.57174v-20.18c0,-2.86088 2.31934,-5.18869 5.17434,-5.18869c2.85059,0 5.16932,2.32781 5.16932,5.18869v20.18c0,1.42034 1.15141,2.57174 2.57174,2.57174c1.42034,0 2.57102,-1.15141 2.57102,-2.57174v-14.21778c0,-2.86051 2.31981,-5.18798 5.17004,-5.18797c2.85317,0 5.17434,2.33094 5.17434,5.19586v14.2106c0.00037,1.41997 1.15141,2.57103 2.57174,2.57103c1.41997,0 2.57103,-1.15177 2.57103,-2.57174v-8.94657c0,-2.86198 2.32049,-5.19084 5.17219,-5.19084c2.8517,0 5.17219,2.32886 5.17219,5.19084v41.80804h0.00144c0.27297,8.7498 -6.00114,16.02247 -5.41257,24.8542v16.82899h-45.65202v-11.55203h27.66561c1.42034,0 2.57103,-1.15141 2.57103,-2.57174c0,-1.42034 -1.15069,-2.57174 -2.57103,-2.57174h-27.67996c-0.14696,-4.70188 -2.46899,-9.12329 -6.28656,-11.90077c-4.38813,-3.1919 -10.33411,-9.02917 -13.74203,-18.71545c-3.38662,-9.86631 -7.36942,-17.95776 -11.8979,-26.5742c-0.20647,-0.6095 -0.11485,-0.88085 0.42264,-1.23134c5.41903,-2.47549 11.94658,-0.33411 14.85999,4.8744l6.10071,10.90766c0.57129,1.02098 1.76128,1.52816 2.89321,1.23277c1.13267,-0.29538 1.92307,-1.31836 1.92307,-2.4885v-57.66186c0,-2.86198 2.32049,-5.19085 5.17219,-5.19085zM24.61238,121.9662c-1.42034,0 -2.57174,1.15141 -2.57174,2.57174v22.81561c0,1.42034 1.15141,2.57174 2.57174,2.57174h22.81274c1.42034,0 2.57174,-1.15104 2.57174,-2.57174c0,-1.42034 -1.15069,-2.57174 -2.57103,-2.57174h-20.24243v-20.24386c0,-1.42034 -1.15069,-2.57174 -2.57102,-2.57174zM2.57174,121.96692c-1.42034,0 -2.57174,1.15141 -2.57174,2.57174v44.85912c0,1.42034 1.15141,2.57174 2.57174,2.57174h44.85984c1.42034,0 2.57174,-1.15141 2.57174,-2.57174c0,-1.42034 -1.15141,-2.57174 -2.57174,-2.57174h-42.28809v-42.28737c0,-1.42034 -1.15141,-2.57174 -2.57174,-2.57174zM154.06921,149.76312c-1.62304,0 -2.93878,1.31574 -2.93878,2.93878c0,1.62304 1.31574,2.93878 2.93878,2.93878c1.62304,0 2.93878,-1.31574 2.93878,-2.93878c0,-1.62304 -1.31574,-2.93878 -2.93878,-2.93878z"></path>
          </g>
          <path d="" fill="none"></path>
        </g>
      </g>
    </svg>
  )
}

Select.defaultProps = {
  color: '#42C2D3',
  size: 45
}

Select.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number
}

export default Select
