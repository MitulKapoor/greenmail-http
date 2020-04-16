package uk.co.bigsoft.greenmail.http.commands;

import java.util.Map.Entry;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Properties;
import java.util.SortedSet;
import java.util.TreeSet;

import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.PropertiesBasedServerSetupBuilder;
import com.icegreen.greenmail.util.ServerSetup;

import io.javalin.http.Context;
import uk.co.bigsoft.greenmail.http.dto.KeyOrderComparator;
import uk.co.bigsoft.greenmail.http.dto.KeyValue;
import uk.co.bigsoft.greenmail.http.dto.ServerConfigDto;

public class CfgCommand extends BaseHandler {

	public CfgCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		Properties properties = System.getProperties();
		ServerSetup[] serverSetup = new PropertiesBasedServerSetupBuilder().build(properties);

		System.out.println("\n\n\n");
		ArrayList<ServerConfigDto> list = new ArrayList<>();

		list.add(blar("greenmail", properties, "greenmail."));

		// Service props
		for (ServerSetup ss : serverSetup) {
			Properties serProp = ss.configureJavaMailSessionProperties(properties, false);
			list.add(blar(ss.getProtocol(), serProp, "mail."));
		}

		ctx.json(list);
	}

	private ServerConfigDto blar(String title, Properties properties, String filter) {
		Collection<KeyValue> list = filterFor(properties, filter);
		ServerConfigDto xx = new ServerConfigDto(title, list);
		return xx;
	}

	private Collection<KeyValue> filterFor(Properties properties, String prefix) {
		SortedSet<KeyValue> list = new TreeSet<KeyValue>(new KeyOrderComparator());
		for (Entry<Object, Object> e : properties.entrySet()) {
			String key = e.getKey().toString();
			if (key.startsWith(prefix)) {
				list.add(new KeyValue(e.getKey().toString(), e.getValue().toString()));
			}
		}
		return list;
	}
}
