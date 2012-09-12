rq = [
];
define(function(PlotData){

    return Backbone.Model.extend({

        remove: function() {
            this.destroy();
        },

/** 
 * return timestamp from last element of
 * first data series. this should be the
 * highest timestamp and thus duration.
 * 
 * assumption: all series have same number
 * of data points.
 */
        duration: function() {
            var data = this.get('data');
            if (!data || !data.length) return undefined;

            var toHrs = 1000 * 60 * 60;
            l = _.last(data[0]['data'])[0]
            return Math.round(l / toHrs);
        },

/**
 * find the highest temperature recorded
 * for this firing.
 *
 */
        maxTemp: function(){
            var data = this.get('data'),
                thisMax = 0,
                maxTemp = 0;
            if (!data || !data.length) return undefined;

            _.each(data, function(series){
                thisMax = _.max(series.data, function(d){ return d[1] })[1];
                maxTemp = _.max([maxTemp, thisMax]);
            });
            return Math.round(maxTemp);
        }

    });
    
});